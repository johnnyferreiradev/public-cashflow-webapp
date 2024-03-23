import { useQuery } from '@tanstack/react-query';

import { listRecentTransactions } from '@/services/cashflow/transaction';
import { TransactionResponse } from '@/services/cashflow/transaction/types';

export const useLastTransactionsTable = () => {
  const { data, isLoading, isError, refetch } = useQuery<TransactionResponse[]>(
    {
      queryKey: ['recent-transactions'],
      queryFn: () => listRecentTransactions({ total: 10 }),
    },
  );

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};
