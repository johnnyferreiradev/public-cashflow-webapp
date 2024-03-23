import { CashFlowsResponse } from '@/services/cashflow/cashFlow/types';

export interface UseCashFlowsTableResult {
  data: CashFlowsResponse;
  isPending: boolean;
  isError: boolean;
  search: string;
  handleChangeSearch: (value: string) => void;
  ordering: string;
  handleChangeOrdering: (value: string) => void;
  handleRefetch: () => void;
  formModalIsOpen: boolean;
  page: number;
  handleChangePage: (page: number) => void;
  pageCount: number;
  handleOpenFormModal: (id?: string, description?: string) => void;
  id?: string;
  description?: string;
  openingBalance?: string;
  year?: string;
  handleFormClose: () => void;
  removeConfirmIsOpen: boolean;
  handleOpenRemoveConfirm: (
    id: string,
    description: string,
    openingBalance: string,
    year: string,
  ) => void;
  handleRemoveClose: () => void;
  activeConfirmIsOpen: boolean;
  handleOpenActiveConfirm: (id: string) => void;
  handleActiveConfirmClose: () => void;
}

export interface CashFlowListTableProps {
  className?: string;
  id?: string;
}
