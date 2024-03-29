import { QUERY_KEY } from '@/constants';
import { BaseResponse, ConfigQueryOption } from '@/types';
import { api } from '@/utils/axios';
import { usePost } from '@/utils/reactQuery';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import {
  IFormLoginData,
  IFormSignUpData,
  LoginResponse,
  Profile,
} from '../types/ILogin';

export const useLogin = () => {
  return useMutation<
    BaseResponse<LoginResponse>,
    BaseResponse<string>,
    IFormLoginData
  >(async ({ email, password }: IFormLoginData) => {
    const { data } = await api.post<BaseResponse<LoginResponse>>(
      '/shop/login',
      {
        email,
        password,
      },
    );
    return data;
  });
};
export const useLogout = () => usePost('/shop/logout');

export const useResetPassword = () => {
  return useMutation<
    AxiosResponse<BaseResponse<LoginResponse>>,
    AxiosError,
    IFormLoginData
  >(async ({ email }: IFormLoginData) => {
    const response = await api.post('/resetPassword', { email });
    return response;
  });
};
export const useSignUp = () => {
  return useMutation<
    BaseResponse<LoginResponse>,
    BaseResponse<string>,
    Partial<IFormSignUpData>
  >(async ({ email, password, name }: Partial<IFormSignUpData>) => {
    const { data } = await api.post<BaseResponse<LoginResponse>>(
      '/shop/signup',
      { name, email, password },
    );
    return data;
  });
};
export const useGetProfile = (
  config?: ConfigQueryOption<BaseResponse<Profile>>,
) => {
  return useQuery(
    [QUERY_KEY.GET_PROFILE],
    async () => {
      const { data } = await api.get<BaseResponse<Profile>>('/profile');
      return data;
    },
    { ...config },
  );
};
