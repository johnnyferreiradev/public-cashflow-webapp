import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const <FTName | camelcase>FormSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Este campo é de preenchimento obrigatório',
  }),
  description: z.string().trim().min(1, {
    message: 'Este campo é de preenchimento obrigatório',
  }),
});

export type [FTName]FormSchema = z.infer<typeof <FTName | camelcase>FormSchema>;

export interface Use[FTName]FormReturn {
  form: UseFormReturn<[FTName]FormSchema>;
  handleSave: (data: [FTName]FormSchema) => void;
  saveIsPeding: boolean;
  saveIsError: boolean;
  handleClose: () => void;
  showIsLoading: boolean;
  showIsError: boolean;
  handleRefetch: () => void;
}

export interface [FTName]FormModalProps {
  className?: string;
  id?: string;
  name?: string;
  open: boolean;
  onClose: () => void;
}
