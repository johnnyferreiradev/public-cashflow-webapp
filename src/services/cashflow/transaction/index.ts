import apiV1 from '../../apiV1';

import {
  CreateTransactionParams,
  ListRecentTransactionsParams,
  ListTodayTransactionsParams,
  ListTransactionsParams,
  UpdateTransactionParams,
} from './types';

export const listTransactions = async (params: ListTransactionsParams) => {
  try {
    return (
      await apiV1.get('/transaction', {
        params: {
          search: params.search,
          ordering: params.ordering,
          category: params.filters?.category,
          type: params.filters?.type,
          subtype: params.filters?.subtype,
          page: params.page,
          page_size: params.page_size,
          date: params.date,
        },
      })
    ).data;
  } catch (error) {
    throw error;
  }
};

export const listTodayTransactions = async (
  params: ListTodayTransactionsParams,
) => {
  try {
    return (
      await apiV1.get('/transaction/?is-today=1', {
        params: {
          search: params.search,
          ordering: params.ordering,
          category: params.filters?.category,
          type: params.filters?.type,
          subtype: params.filters?.subtype,
          page: params.page,
          size: params.page_size,
        },
      })
    ).data;
  } catch (error) {
    throw error;
  }
};

export const createTransaction = async (data: CreateTransactionParams) => {
  try {
    return (await apiV1.post('/transaction/', data)).data;
  } catch (error) {
    throw error;
  }
};

export const showTransaction = async (id: string) => {
  try {
    return (await apiV1.get(`/transaction/${id}`)).data;
  } catch (error) {
    throw error;
  }
};

export const udpateTransaction = async (data: UpdateTransactionParams) => {
  try {
    return (await apiV1.patch(`/transaction/${data.id}/`, data)).data;
  } catch (error) {
    throw error;
  }
};

export const listRecentTransactions = async (
  params: ListRecentTransactionsParams,
) => {
  try {
    return (
      await apiV1.get('/transaction/recents/', {
        params: {
          total: params.total,
        },
      })
    ).data;
  } catch (error) {
    throw error;
  }
};
