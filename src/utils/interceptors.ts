import { LOCAL_STORAGE_KEY } from '@/constants';
import { RefreshResponse } from '@/pages/Login/types/ILogin';
import { BaseResponse } from '@/types';
import {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { api } from './axios';
import { getItem, setItem } from './localStorage';
export interface ConsoleError {
  status: number;
  data: unknown;
}

export const requestInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token = getItem<string>(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  const shopId = getItem<string>(LOCAL_STORAGE_KEY.SHOP_ID);
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
          headers: { 'x-rtoken-id': getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN) },
        },
      );
      if (data) {
        setItem(
          LOCAL_STORAGE_KEY.ACCESS_TOKEN,
          data.metadata.token.accessToken,
        );
        setItem(
          LOCAL_STORAGE_KEY.REFRESH_TOKEN,
          data.metadata.token.refreshToken,
        );
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
