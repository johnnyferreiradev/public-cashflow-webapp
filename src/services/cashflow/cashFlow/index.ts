import apiV1 from '../../apiV1';

import {
  CreateCashFlowParams,
  DeleteCashFlowParams,
  ListCashFlowsParams,
  UpdateCashFlowParams,
} from './types';

export const listCashFlows = async (params: ListCashFlowsParams) => {
  try {
    return (
      await apiV1.get('/cashflow', {
        params: {
          search: params.search,
          ordering: params.ordering,
          page: params.page,
        },
      })
    ).data;
  } catch (error) {
    throw error;
  }
};

export const createCashFlow = async (data: CreateCashFlowParams) => {
  try {
    return (await apiV1.post('/cashflow/', data)).data;
  } catch (error) {
    throw error;
  }
};

export const showCashFlow = async (id: string) => {
  try {
    return (await apiV1.get(`/cashflow/${id}`)).data;
  } catch (error) {
    throw error;
  }
};

export const udpateCashFlow = async (data: UpdateCashFlowParams) => {
  try {
    return (await apiV1.patch(`/cashflow/${data.id}/`, data)).data;
  } catch (error) {
    throw error;
  }
};

export const removeCashFlow = async (data: DeleteCashFlowParams) => {
  try {
    return (await apiV1.delete(`/cashflow/${data.id}/`)).data;
  } catch (error) {
    throw error;
  }
};

export const showActiveCashFlow = async () => {
  try {
    return (await apiV1.get('/cashflow/active/')).data;
  } catch (error) {
    throw error;
  }
};

export const getActiveCashFlowStatistics = async (params?: {
  period?: string;
  date?: string;
}) => {
  try {
    return (
      await apiV1.get('/cashflow/active/statistics/', {
        params: {
          period: params?.period,
          date: params?.date,
        },
      })
    ).data;
  } catch (error) {
    throw error;
  }
};
