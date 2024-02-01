import useAuthStore from '@/auth/useAuthStore';
import { RefreshResponse } from '@/pages/Login/types/ILogin';
import { BaseResponse } from '@/types';
import {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { api } from './axios';
export interface ConsoleError {
  status: number;
  data: unknown;
}

export const requestInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token = useAuthStore.getState().accessToken;
  const shopId = useAuthStore.getState().shopId;
  if (token && shopId) {
    config.headers.set('access-token', token);
    config.headers.set('x-client-id', shopId);
  }
  return config;
};

export const successInterceptor = <T>(
  response: AxiosResponse<BaseResponse<T>>,
): AxiosResponse<BaseResponse<T>> => {
  return response;
};

export const errorInterceptor = async (
  error: AxiosError<BaseResponse<string>>,
): Promise<void> => {
  const originalConfig = error.config as InternalAxiosRequestConfig;
  if (
    originalConfig &&
    originalConfig.url !== '/login' &&
    error.response &&
    error.response.data.statusCode === 401
  ) {
    try {
      const { data } = await api.post<BaseResponse<RefreshResponse>>(
        '/shop/renewToken',
        undefined,
        {
          headers: { 'x-rtoken-id': useAuthStore.getState().refreshToken },
        },
      );
      if (data) {
        useAuthStore.setState((pre) => ({
          ...pre,
          accessToken: data.metadata.token.accessToken,
          refreshToken: data.metadata.token.refreshToken,
        }));
        originalConfig.headers.set(
          'access-token',
          data.metadata.token.accessToken,
        );
      }
      return api(originalConfig);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  if (error.response?.status === 401) {
    await Promise.reject(error);
  } else {
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    await Promise.reject(error);
  }
};
