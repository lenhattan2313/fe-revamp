import { BaseResponse, ConfigQueryOption } from '@/types';
import { IProduct } from '../types/IProduct';
import { QUERY_KEY_PRODUCT } from '../constants/ProductConstants';
import { api } from '@/utils/axios';
import { useFetch } from '@/utils/reactQuery';

export const useGetAllProductDraft = (
  config?: ConfigQueryOption<BaseResponse<IProduct[]>>,
) => {
  return useFetch(
    [QUERY_KEY_PRODUCT.GET_ALL_PRODUCT_DRAFT],
    async () => {
      const { data } =
        await api.get<BaseResponse<IProduct[]>>('/product/draft/all');
      return data;
    },
    { ...config },
  );
};
