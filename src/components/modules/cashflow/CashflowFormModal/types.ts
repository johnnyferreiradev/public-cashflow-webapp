import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const cashFlowFormSchema = z.object({
  description: z.string().trim().min(1, {
    message: 'Este campo é de preenchimento obrigatório',
  }),
  openingBalance: z.string().min(1, {
    message: 'Este campo é de preenchimento obrigatório',
  }),
  isActive: z.boolean(),
});

export type CashFlowFormSchema = z.infer<typeof cashFlowFormSchema>;

export interface UseCashFlowFormReturn {
  form: UseFormReturn<CashFlowFormSchema>;
  handleSave: (data: CashFlowFormSchema) => void;
  saveIsPeding: boolean;
  saveIsError: boolean;
  handleClose: () => void;
  showIsLoading: boolean;
  showIsError: boolean;
  handleRefetch: () => void;
}

export interface UseCashFlowFormProps {
  onClose: () => void;
  open: boolean;
  id?: string;
  defaultActive?: boolean;
  onSave?: () => void;
}

export interface CashFlowFormModalProps {
  className?: string;
  id?: string;
  description?: string;
  open: boolean;
  onClose: () => void;
  defaultActive?: boolean;
  onSave?: () => void;
}
