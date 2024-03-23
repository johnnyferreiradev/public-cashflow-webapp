export interface TransactionsTableFilter {
  search: string;
  ordering: string[];
  page: number;
  type?: string;
  subtype?: string;
  category?: string;
  categoryName?: string;
  date?: string;
}

export interface TransactionListTableProps {
  className?: string;
  id?: string;
  isToday?: boolean;
}
