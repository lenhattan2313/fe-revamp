import { useAlert } from '@/hooks';
import { ConfigQueryOption } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from './axios';
type DataResponse<T> = () => Promise<T>;

export const useFetch = <T>(
  queryKey: QueryKey,
  queryFn: DataResponse<T>,
  config?: ConfigQueryOption<T>,
) => {
  const { showSnackbar } = useAlert();
  return useQuery(queryKey, queryFn, {
    ...config,
    onError: (error) => {
      showSnackbar(error.message, 'error');
    },
  });
};

const useGenericMutation = <T, S>(
  func: (data: T | S) => Promise<AxiosResponse<S>>,
  url: string,
  params?: object,
  updater?: ((oldData: T, newData: S) => T) | undefined,
) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useAlert();

  return useMutation<AxiosResponse, AxiosError, T | S>(func, {
    onMutate: async (data) => {
      await queryClient.cancelQueries([url!, params]);

      const previousData = queryClient.getQueryData([url!, params]);

      queryClient.setQueryData<T>([url!, params], (oldData) => {
        return updater ? updater(oldData!, data as S) : (data as T);
      });

      return previousData;
    },
    onError: (error, _, context) => {
      queryClient.setQueryData([url!, params], context);
      showSnackbar(error.message, 'error');
    },
    onSettled: () => {
      queryClient.invalidateQueries([url!, params]);
    },
  });
};
export const usePost = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T,
) => {
  return useGenericMutation<T, S>(
    (data) => api.post<S>(url, data),
    url,
    params,
    updater,
  );
};
