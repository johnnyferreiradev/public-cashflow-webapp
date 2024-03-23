import { [FTName]Response } from '@/services/cashflow/<FTName | camelcase>/types';

export interface Use[FTName]FormReturn {
  data: [FTName]Response;
  showIsLoading: boolean;
  showIsError: boolean;
  handleRefetch: () => void;
}

export interface [FTName]DetailsProps {
  className?: string;
  id: string;
  name: string;
  open: boolean;
  onClose: () => void;
}
