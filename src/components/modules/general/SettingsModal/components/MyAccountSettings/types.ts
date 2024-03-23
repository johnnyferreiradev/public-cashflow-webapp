import { z } from 'zod';

export const myAccountFormSchema = z.object({
  firstName: z.string().trim().min(1, {
    message: 'Este campo é de preenchimento obrigatório',
  }),
  lastName: z.string().min(1, {
    message: 'Este campo é de preenchimento obrigatório',
  }),
});

export type MyAccountFormSchema = z.infer<typeof myAccountFormSchema>;

export interface MyAccountSettingsProps {
  className?: string;
  id?: string;
}
