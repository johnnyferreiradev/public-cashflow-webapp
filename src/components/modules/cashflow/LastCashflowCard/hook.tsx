import { useMemo } from 'react';
import { ArrowDown, ArrowUp, Equals } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';

import { getActiveCashFlowStatistics } from '@/services/cashflow/cashFlow';
import { ActiveCashFlowPreviousTransactionsResponse } from '@/services/cashflow/cashFlow/types';

export const useLastCashFlowCard = () => {
  const statusIcons = {
    positive: <ArrowUp size={18} weight="bold" className="text-success-400" />,
    negative: (
      <ArrowDown size={18} weight="bold" className="text-failure-400" />
    ),
    equal: <Equals size={18} weight="bold" className="text-primary-400" />,
  };

  const { data, isLoading, isError, refetch } =
    useQuery<ActiveCashFlowPreviousTransactionsResponse>({
      queryKey: ['get-previous-transactions-statistics'],
      queryFn: () => getActiveCashFlowStatistics({ period: 'previous' }),
    });

  const balanceStatus = useMemo(() => {
    if (!data || Object.keys(data).length === 0) return 'equal';
    if (parseFloat(data.last_balance) > 0) {
      return 'positive';
    }
    if (parseFloat(data.last_balance) < 0) {
      return 'negative';
    }
    return 'equal';
  }, [data]);

  return {
    statusIcons,
    balanceStatus,
    data: data && Object.keys(data).length !== 0 ? data : null,
    isLoading,
    isError,
    refetch,
  };
};
