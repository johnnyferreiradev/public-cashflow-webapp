import { TransactionResponse } from '@/services/cashflow/transaction/types';

export interface UseTransactionFormReturn {
  data: TransactionResponse;
  showIsLoading: boolean;
  showIsError: boolean;
  handleRefetch: () => void;
}

export interface TransactionDetailsProps {
  className?: string;
  id: string;
  name: string;
  open: boolean;
  onClose: () => void;
}
