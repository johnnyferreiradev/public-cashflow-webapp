import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const cashFlowRemoveSchema = z.object({
  year: z.string().min(1, {
    message: 'Este campo é de preenchimento obrigatório',
  }),
  openingBalance: z.string().min(1, {
    message: 'Este campo é de preenchimento obrigatório',
  }),
});

export type CashFlowRemoveSchema = z.infer<typeof cashFlowRemoveSchema>;

export interface UseCashFlowFormReturn {
  form: UseFormReturn<CashFlowRemoveSchema>;
  removeIsPeding: boolean;
  removeIsError: boolean;
  handleClose: () => void;
  handleConfirm: (data: CashFlowRemoveSchema) => void;
}

export interface CashFlowRemoveConfirmProps {
  className?: string;
  id: string;
  openingBalance: string;
  year: string;
  open: boolean;
  onClose: () => void;
}
