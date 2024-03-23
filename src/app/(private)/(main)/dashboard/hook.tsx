import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { useCashFlowStore } from '@/store/cashFlowStore';

import { getActiveCashFlowStatistics } from '@/services/cashflow/cashFlow';
import { ActiveCashFlowDateTransactionsResponse } from '@/services/cashflow/cashFlow/types';

export const useDashboard = () => {
  const {
    activeCashFlow: {
      data: { id: cashFlowId },
      isLoading: activeCashFlowIsLoading,
    },
  } = useCashFlowStore((state) => state);
  const router = useRouter();

  const [cashFlowFormIsOpen, setCashFlowFormIsOpen] = useState(false);

  const { data, isLoading, isError, refetch } =
    useQuery<ActiveCashFlowDateTransactionsResponse>({
      queryKey: ['get-transactions-statistics'],
      queryFn: () => getActiveCashFlowStatistics(),
      enabled: !!cashFlowId,
    });

  const balanceStatus = useMemo(() => {
    if (!data) return 'equal';
    if (parseFloat(data.balance) > 0) {
      return 'positive';
    }
    if (parseFloat(data.balance) < 0) {
      return 'negative';
    }
    return 'equal';
  }, [data]);

  const handleOpenCashFlowForm = () => {
    setCashFlowFormIsOpen(true);
  };

  const handleCloseCashFlowForm = () => {
    setCashFlowFormIsOpen(false);
  };

  const handleSaveCashFlow = () => {
    router.push('/cash-flow-list');
  };

  return {
    data,
    isLoading,
    isError,
    refetch,
    balanceStatus,
    hasActiveCashFlow: cashFlowId,
    activeCashFlowIsLoading,
    cashflow: {
      isOpen: cashFlowFormIsOpen,
      handleClose: handleCloseCashFlowForm,
      handleOpen: handleOpenCashFlowForm,
      handleSave: handleSaveCashFlow,
    },
  };
};
