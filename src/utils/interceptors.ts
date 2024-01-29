import {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { getItem } from './localStorage';
import { LOCAL_STORAGE_KEY } from '@/constants';

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

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
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
