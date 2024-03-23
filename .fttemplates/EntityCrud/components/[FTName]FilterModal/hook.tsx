import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Use[FTName]sFilterModalResult,
  [FTName]sFilterFormSchema,
  <FTName | camelcase>sFilterFormSchema,
} from './types';
import { [FTName]sTableFilter } from '../../types';

export const use[FTName]sFilterModal = (
  initialFilters: [FTName]sTableFilter,
  onApply: (filters: [FTName]sTableFilter) => void,
  onClose: () => void,
): Use[FTName]sFilterModalResult => {
  const [typeSelectKey, setTypeSelectKey] = useState('');
  const [subtypeSelectKey, setSubtypeSelectKey] = useState('');

  const form = useForm<[FTName]sFilterFormSchema>({
    resolver: zodResolver(<FTName | camelcase>sFilterFormSchema),
    defaultValues: {
      type: initialFilters.type,
      subtype: initialFilters.subtype,
    },
  });

  const handleSave = (data: [FTName]sFilterFormSchema) => {
    onApply({
      type: data.type,
      subtype: data.subtype,
    });
  };

  const handleClose = () => {
    form.setValue('type', initialFilters.type);
    form.setValue('subtype', initialFilters.subtype);
    onClose();
  };

  return {
    form,
    handleSave,
    typeSelectKey,
    setTypeSelectKey,
    subtypeSelectKey,
    setSubtypeSelectKey,
    handleClose,
  };
};
