import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  UseCategoriesFilterModalResult,
  CategoriesFilterFormSchema,
  categoriesFilterFormSchema,
} from './types';

import { CategoriesTableFilter } from '../../types';

export const useCategoriesFilterModal = (
  initialFilters: CategoriesTableFilter,
  onApply: (filters: CategoriesTableFilter) => void,
  onClose: () => void,
): UseCategoriesFilterModalResult => {
  const [typeSelectKey, setTypeSelectKey] = useState('');
  const [subtypeSelectKey, setSubtypeSelectKey] = useState('');

  const form = useForm<CategoriesFilterFormSchema>({
    resolver: zodResolver(categoriesFilterFormSchema),
    defaultValues: {
      type: initialFilters.type,
      subtype: initialFilters.subtype,
    },
  });

  const handleSave = (data: CategoriesFilterFormSchema) => {
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
