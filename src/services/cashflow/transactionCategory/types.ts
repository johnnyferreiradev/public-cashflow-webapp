import { PaginatedResponseProps } from '../../types';

export type TransactionCategoryTypes = 'inflow' | 'outflow';

export interface TransactionCategoryResponse {
  company: string;
  description?: string;
  name: string;
  id: string;
}

export interface ListTransactionCategoriesParams {
  search?: string;
  ordering?: string;
  page?: number;
  details?: 'minimal' | 'full';
}

export interface TransactionCategoriesResponse
  extends PaginatedResponseProps<TransactionCategoryResponse> {}

export interface CreateTransactionCategoryParams {
  name: string;
  description?: string;
  company: string;
}

export interface CreateTransactionCategoryResponse {
  id: string;
  name: string;
  description: string;
  company: string;
}

export interface UpdateTransactionCategoryParams {
  id: string;
  name: string;
  description?: string;
  company: string;
}

export interface DeleteTransactionCategoryParams {
  id: string;
}
