enum CardStatus {
  positive = 'positive',
  negative = 'negative',
  equal = 'equal',
  start = 'start',
}

export interface TotalCardProps {
  className?: string;
  id?: string;
  status: keyof typeof CardStatus;
  total: string;
  title: string;
  description?: string;
  isLoading: boolean;
  isError: boolean;
}
