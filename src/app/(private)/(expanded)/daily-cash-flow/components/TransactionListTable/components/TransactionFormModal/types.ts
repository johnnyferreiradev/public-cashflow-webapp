import { z } from 'zod';

export const transactionFormSchema = z.object({
  type: z.union([z.literal('inflow'), z.literal('outflow')]),
  subtype: z
    .union([
      z.literal('sale'),
      z.literal('financial_application'),
      z.literal('investment'),
      z.literal('variable_cost'),
      z.literal('fixed_cost'),
      z.literal('other'),
      z.literal(''),
    ])
    .optional(),
  name: z.string().min(1, {
    message: 'Este campo é de preenchimento obrigatório',
  }),
  description: z.string(),
  value: z.string().min(1, {
    message: 'Este campo é de preenchimento obrigatório',
  }),
  category: z.string().optional(),
  categoryName: z.string().optional(),
});

export type TransactionFormSchema = z.infer<typeof transactionFormSchema>;

export interface UseTransactionFormProps {
  open: boolean;
  onClose: () => void;
  id?: string;
  category?: { id: string; name: string };
}

export interface TransactionFormModalProps {
  className?: string;
  id?: string;
  name?: string;
  open: boolean;
  onClose: () => void;
  onOpenCategoryForm: () => void;
  category?: { id: string; name: string };
}
