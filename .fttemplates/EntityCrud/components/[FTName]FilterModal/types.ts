import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { SetStateAction } from '@/utils/types';
import { [FTName]sTableFilter } from '../../types';

export const <FTName | camelcase>sFilterFormSchema = z.object({
  type: z.string().optional(),
  subtype: z.string().optional(),
});

export type [FTName]sFilterFormSchema = z.infer<
  typeof <FTName | camelcase>sFilterFormSchema
>;

export interface [FTName]sFilterModalProps {
  className?: string;
  id?: string;
  open: boolean;
  initialFilters: [FTName]sTableFilter;
  onClose: () => void;
  onApply: (filters: [FTName]sTableFilter) => void;
}

export interface Use[FTName]sFilterModalResult {
  form: UseFormReturn<[FTName]sFilterFormSchema>;
  handleSave: (data: [FTName]sFilterFormSchema) => void;
  typeSelectKey: string;
  setTypeSelectKey: SetStateAction<string>;
  subtypeSelectKey: string;
  setSubtypeSelectKey: SetStateAction<string>;
  handleClose: () => void;
}
