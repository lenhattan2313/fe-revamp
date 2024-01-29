import { useAlert } from '@/hooks';
import { ConfigQueryOption } from '@/types';
import { QueryKey, useQuery } from 'react-query';
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
