import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  TransactionsFilterFormSchema,
  transactionsFilterFormSchema,
} from './types';
import { TransactionsTableFilter } from '../../types';

export const useTransactionsFilterModal = (
  initialFilters: TransactionsTableFilter,
  onApply: (filters: TransactionsTableFilter) => void,
  onClose: () => void,
) => {
  const [typeSelectKey, setTypeSelectKey] = useState('');
  const [subtypeSelectKey, setSubtypeSelectKey] = useState('');
  const [categorySelectKey, setCategorySelectKey] = useState('');

  const form = useForm<TransactionsFilterFormSchema>({
    resolver: zodResolver(transactionsFilterFormSchema),
    defaultValues: {
      type: initialFilters.type,
      category: initialFilters.category,
      categoryName: initialFilters.categoryName,
      subtype: initialFilters.subtype,
    },
  });

  const handleSave = (data: TransactionsFilterFormSchema) => {
    onApply({
      ...initialFilters,
      type: data.type,
      category: data.category,
      categoryName: data.categoryName,
      subtype: data.subtype,
    });
  };

  const handleClose = () => {
    form.setValue('type', initialFilters.type);
    form.setValue('category', initialFilters.category);
    form.setValue('categoryName', initialFilters.categoryName);
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
    categorySelectKey,
    setCategorySelectKey,
    handleClose,
  };
};
