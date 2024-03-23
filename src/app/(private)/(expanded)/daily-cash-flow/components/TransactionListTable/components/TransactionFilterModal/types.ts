import { z } from 'zod';

import { TransactionsTableFilter } from '../../types';

export const transactionsFilterFormSchema = z.object({
  type: z.string().optional(),
  subtype: z.string().optional(),
  category: z.string().optional(),
  categoryName: z.string().optional(),
});

export type TransactionsFilterFormSchema = z.infer<
  typeof transactionsFilterFormSchema
>;

export interface TransactionsFilterModalProps {
  className?: string;
  id?: string;
  open: boolean;
  initialFilters: TransactionsTableFilter;
  onClose: () => void;
  onApply: (filters: TransactionsTableFilter) => void;
}
