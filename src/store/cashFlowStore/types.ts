export interface CashFlowDataState {
  balance: string;
  createdAt: string;
  description: string;
  id: string;
  openingBalance: string;
  totalInflow: string;
  totalOutflow: string;
  updatedAt: string;
}

export interface ActiveCashFlowState {
  data: CashFlowDataState;
  hasActive: boolean;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export interface CashFlowState {
  activeCashFlow: ActiveCashFlowState;
  setActiveCashFlow: (activeCashFLow: ActiveCashFlowState) => void;
  setActiveCashFlowError: (value: boolean, refetchCallback: () => void) => void;
  setActiveCashFlowLoading: (value: boolean) => void;
  refetchActiveCashFlow: () => void;
}
