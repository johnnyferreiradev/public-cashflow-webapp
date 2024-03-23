import { z } from 'zod';

export const categoryFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Este campo é de preenchimento obrigatório',
  }),
  description: z.string(),
});

export type CategoryFormSchema = z.infer<typeof categoryFormSchema>;

export interface CategoryFormModalProps {
  className?: string;
  id?: string;
  name?: string;
  open: boolean;
  onClose: (category?: { id: string; name: string }) => void;
}
