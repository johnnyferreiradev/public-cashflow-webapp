import { create } from 'zustand';

import { CashFlowState, ActiveCashFlowState } from './types';

const initialData = {
  balance: '0',
  createdAt: '',
  description: '',
  id: '',
  openingBalance: '0',
  totalInflow: '0',
  totalOutflow: '0',
  updatedAt: '',
};

export const useCashFlowStore = create<CashFlowState>((set) => ({
  activeCashFlow: {
    data: { ...initialData },
    hasActive: false,
    isLoading: true,
    isError: false,
    refetch: () => undefined,
  },
  setActiveCashFlow: (activeCashFlow: ActiveCashFlowState) =>
    set((state) => ({ ...state, activeCashFlow })),
  setActiveCashFlowError: (value: boolean, refetchCallback: () => void) =>
    set((state) => ({
      ...state,
      activeCashFlow: {
        ...state.activeCashFlow,
        data: { ...initialData },
        isError: value,
        isLoading: false,
        refetch: refetchCallback,
      },
    })),
  setActiveCashFlowLoading: (value: boolean) =>
    set((state) => ({
      ...state,
      activeCashFlow: {
        ...state.activeCashFlow,
        data: { ...initialData },
        isError: false,
        isLoading: value,
      },
    })),
  refetchActiveCashFlow: () =>
    set((state) => {
      state.activeCashFlow.refetch();
      return {
        ...state,
        activeCashFlow: {
          ...state.activeCashFlow,
          data: { ...initialData },
          isError: false,
          isLoading: true,
        },
      };
    }),
}));
