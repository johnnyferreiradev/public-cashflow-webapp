import { useQuery } from '@tanstack/react-query';

import { showTransaction } from '@/services/cashflow/transaction';

import { UseTransactionFormReturn } from './types';

export const useTransactionForm = ({
  id,
  open,
}: {
  id: string;
  open: boolean;
}): UseTransactionFormReturn => {
  const {
    data,
    isError: showIsError,
    isLoading: showIsLoading,
    refetch,
  } = useQuery({
    queryKey: ['show-transaction', id],
    queryFn: () => showTransaction(id),
    enabled: open,
  });

  const handleRefetch = () => {
    refetch();
  };

  return {
    data,
    showIsLoading,
    showIsError,
    handleRefetch,
  };
};
