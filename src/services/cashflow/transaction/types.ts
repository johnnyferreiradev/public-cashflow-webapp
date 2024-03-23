import { PaginatedResponseProps } from '../../types';

export type TransactionTypes = 'inflow' | 'outflow';

export type TransactionInflowSubtypes =
  | 'sale'
  | 'financial_application'
  | 'investment'
  | 'other';

export type TransactionOutflowSubtypes =
  | 'financial_application'
  | 'investment'
  | 'variable_cost'
  | 'fixed_cost'
  | 'other';

export interface TransactionResponse {
  id: string;
  name: string;
  description: string;
  type: TransactionTypes;
  subtype: TransactionInflowSubtypes | TransactionOutflowSubtypes;
  value: string;
  category: {
    name: string;
    id: string;
  };
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export interface ListTransactionsParams {
  search?: string;
  ordering?: string;
  page?: number;
  filters?: {
    type?: string;
    category?: string;
    subtype?: string;
  };
  page_size?: number;
  date?: string;
}

export interface ListTodayTransactionsParams {
  search?: string;
  ordering?: string;
  filters?: {
    type?: string;
    category?: string;
    subtype?: string;
  };
  page?: number;
  page_size?: number;
}

export interface TransactionsResponse
  extends PaginatedResponseProps<TransactionResponse> {}

export type TodayTransactionsResponse = TransactionResponse[];

export interface CreateTransactionParams {
  type: TransactionTypes;
  subtype: TransactionInflowSubtypes | TransactionOutflowSubtypes;
  name: string;
  description?: string | null;
  value: number;
  category?: string | null;
  cashflow: string;
}

export interface UpdateTransactionParams {
  id: string;
  name: string;
  description?: string | null;
  category?: string | null;
}

export interface ListRecentTransactionsParams {
  total?: number;
}
