import { QUERY_KEY } from '@/constants';
import { BaseResponse, ConfigQueryOption } from '@/types';
import { api } from '@/utils/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { AuthToken, IFormLoginData, Profile } from '../types/ILogin';

export const useLogin = () => {
  return useMutation<
    AxiosResponse<BaseResponse<AuthToken>>,
    AxiosError<BaseResponse<string>>,
    IFormLoginData
  >(async ({ userName, password }: IFormLoginData) => {
    const response = await api.post<BaseResponse<AuthToken>>('/login', {
      userName,
      password,
    });
    return response;
  });
};

export const useResetPassword = () => {
  return useMutation<
    AxiosResponse<BaseResponse<AuthToken>>,
    AxiosError,
    IFormLoginData
  >(async ({ userName }: IFormLoginData) => {
    const response = await api.post('/resetPassword', { userName });
    return response;
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
