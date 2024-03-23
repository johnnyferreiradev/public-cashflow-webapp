import { PaginatedResponseProps } from '../../types';

export interface CashFlowResponse {
  id: string;
  description: string;
  created_at: string;
  updated_at: string;
  opening_balance: string;
  is_active: boolean;
}

export interface ActiveCashFlowResponse {
  id: string;
  description: string;
  created_at: string;
  updated_at: string;
  opening_balance: string;
  is_active: boolean;
  balance: string;
  total_inflow: string;
  total_outflow: string;
}

export interface ListCashFlowsParams {
  search?: string;
  ordering?: string;
  page?: number;
}

export interface CashFlowsResponse
  extends PaginatedResponseProps<CashFlowResponse> {}

export interface CreateCashFlowParams {
  description: string;
  opening_balance: number;
  is_active: boolean;
  company: string;
}

export interface UpdateCashFlowParams {
  id: string;
  description?: string;
  opening_balance?: number;
  is_active?: boolean;
  company?: string;
}

export interface DeleteCashFlowParams {
  id: string;
}

export interface ActiveCashFlowDateTransactionsResponse {
  opening_balance: string;
  total_inflow: string;
  total_outflow: string;
  balance: string;
}

export interface ActiveCashFlowPreviousTransactionsResponse {
  date: string;
  last_total_inflow: string;
  last_total_outflow: string;
  last_balance: string;
}

export interface LastPeriodTotals {
  period: string;
  total_inflow: string;
  total_outflow: string;
}

export type ActiveCashFlowLastPeriodTransactionsResponse = LastPeriodTotals[];
