import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { SetStateAction } from '@/utils/types';
import { CategoriesTableFilter } from '../../types';

export const categoriesFilterFormSchema = z.object({
  type: z.string().optional(),
  subtype: z.string().optional(),
});

export type CategoriesFilterFormSchema = z.infer<
  typeof categoriesFilterFormSchema
>;

export interface CategoriesFilterModalProps {
  className?: string;
  id?: string;
  open: boolean;
  initialFilters: CategoriesTableFilter;
  onClose: () => void;
  onApply: (filters: CategoriesTableFilter) => void;
}

export interface UseCategoriesFilterModalResult {
  form: UseFormReturn<CategoriesFilterFormSchema>;
  handleSave: (data: CategoriesFilterFormSchema) => void;
  typeSelectKey: string;
  setTypeSelectKey: SetStateAction<string>;
  subtypeSelectKey: string;
  setSubtypeSelectKey: SetStateAction<string>;
  handleClose: () => void;
}
