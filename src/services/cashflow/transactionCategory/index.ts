import apiV1 from '../../apiV1';

import {
  CreateTransactionCategoryParams,
  DeleteTransactionCategoryParams,
  ListTransactionCategoriesParams,
  UpdateTransactionCategoryParams,
} from './types';

export const listTransactionCategories = async (
  params: ListTransactionCategoriesParams,
) => {
  try {
    return (
      await apiV1.get('/transaction-category/', {
        params: {
          search: params.search,
          ordering: params.ordering,
          page: params.page,
          details: params.details,
        },
      })
    ).data;
  } catch (error) {
    throw error;
  }
};

export const createTransactionCategory = async (
  data: CreateTransactionCategoryParams,
) => {
  try {
    return (await apiV1.post('/transaction-category/', data)).data;
  } catch (error) {
    throw error;
  }
};

export const showTransactionCategory = async (id: string) => {
  try {
    return (await apiV1.get(`/transaction-category/${id}/`)).data;
  } catch (error) {
    throw error;
  }
};

export const udpateTransactionCategory = async (
  data: UpdateTransactionCategoryParams,
) => {
  try {
    return (await apiV1.patch(`/transaction-category/${data.id}/`, data)).data;
  } catch (error) {
    throw error;
  }
};

export const removeTransactionCategory = async (
  data: DeleteTransactionCategoryParams,
) => {
  try {
    return (await apiV1.delete(`/transaction-category/${data.id}/`)).data;
  } catch (error) {
    throw error;
  }
};
