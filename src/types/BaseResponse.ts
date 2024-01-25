import { AxiosError } from 'axios';
import { UseQueryOptions } from 'react-query';

export interface BaseResponse<T> {
  statusCode: number;
  metadata: T;
  message: string;
}
export interface ListObject<T> {
  totalItemCount: number;
  data: T[];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConfigQueryOption<T> = UseQueryOptions<T, AxiosError, T, any>;
