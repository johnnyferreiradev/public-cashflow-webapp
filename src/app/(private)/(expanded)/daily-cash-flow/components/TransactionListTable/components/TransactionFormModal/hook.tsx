import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useQueries,
} from '@tanstack/react-query';
import { CheckFat } from '@phosphor-icons/react';

import {
  createTransaction,
  showTransaction,
  udpateTransaction,
} from '@/services/cashflow/transaction';

import { useToasterNotificationStore } from '@/store/toasterNotificationStore';

import {
  UseTransactionFormProps,
  TransactionFormSchema,
  transactionFormSchema,
} from './types';
import { TransactionResponse } from '@/services/cashflow/transaction/types';
import { useCashFlowStore } from '@/store/cashFlowStore';
import { extractCurrencyValue } from '@/utils/currency';

export const useTransactionForm = ({
  onClose,
  open,
  id,
  category,
}: UseTransactionFormProps) => {
  const showNotification = useToasterNotificationStore(
    (state) => state.showNotification,
  );
  const queryClient = useQueryClient();
  const {
    data: { id: cashFlowId },
  } = useCashFlowStore((state) => state.activeCashFlow);
  const {} = useQueries({
    queries: [{ queryKey: ['show-transaction-to-details'] }],
  });

  const [subtypeSelectKey, setSubtypeSelectKey] = useState('');
  const [categorySelectKey, setCategorySelectKey] = useState('');

  const {
    data: showData,
    isError: showIsError,
    isLoading: showIsLoading,
    refetch,
  } = useQuery<TransactionResponse>({
    queryKey: ['show-transaction', id],
    queryFn: () => showTransaction(id || ''),
    enabled: !!id && open,
  });

  const form = useForm<TransactionFormSchema>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: 'inflow',
      subtype: undefined,
      name: '',
      description: '',
      value: '0',
      category: undefined,
      categoryName: '',
    },
  });

  useEffect(() => {
    if (!!id && open) {
      form.reset({
        type: showData?.type || 'inflow',
        subtype: showData?.subtype || undefined,
        name: showData?.name || '',
        description: showData?.description || '',
        category: showData?.category?.id || undefined,
        categoryName: showData?.category?.name || '',
        value: showData?.value || '0',
      });
      setSubtypeSelectKey(`subtype-${(+new Date()).toString()}`);
      setCategorySelectKey(`category-${(+new Date()).toString()}`);
    }
  }, [
    form,
    showData?.category?.id,
    showData?.category?.name,
    showData?.description,
    showData?.name,
    showData?.subtype,
    showData?.type,
    showData?.value,
    id,
    open,
  ]);

  useEffect(() => {
    if (category) {
      form.setValue('category', category.id);
      form.setValue('categoryName', category.name);
      setCategorySelectKey((+new Date()).toString());
    }
  }, [category, form]);

  const {
    mutate: handleCreateTransaction,
    isPending: creationIsPeding,
    isError: creationIsError,
  } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      showNotification({
        id: 'transaction-saved-notification',
        description: 'Transação adicionada!',
        duration: 2000,
        theme: 'success',
        icon: <CheckFat />,
      });
      queryClient.invalidateQueries({ queryKey: ['date-transactions'] });
      queryClient.invalidateQueries({
        queryKey: ['get-date-transactions-statistics'],
      });
      queryClient.invalidateQueries({
        queryKey: ['active-cash-flow'],
      });
      handleClose();
    },
  });

  const {
    mutate: handleUpdateTransaction,
    isPending: updateIsPeding,
    isError: updateIsError,
  } = useMutation({
    mutationFn: udpateTransaction,
    onSuccess: () => {
      showNotification({
        id: 'transaction-saved-notification',
        description: 'Transaction atualizado!',
        duration: 2000,
        theme: 'success',
        icon: <CheckFat />,
      });
      queryClient.invalidateQueries({ queryKey: ['date-transactions'] });
      queryClient.invalidateQueries({
        queryKey: ['get-date-transactions-statistics'],
      });
      queryClient.invalidateQueries({
        queryKey: ['active-cash-flow'],
      });
      handleClose();
    },
  });

  const handleTypeChange = () => {
    form.setValue('subtype', undefined);
    setSubtypeSelectKey((+new Date()).toString());
  };

  const handleSave = async (data: TransactionFormSchema) => {
    if (id) {
      handleUpdateTransaction({
        id,
        name: data.name,
        description: data.description || null,
        category: data.category || null,
      });
      return;
    }

    if (!data.subtype) {
      form.setError('subtype', { message: 'Você deve selecionar uma opção' });
      return;
    }

    handleCreateTransaction({
      ...data,
      cashflow: cashFlowId,
      value: extractCurrencyValue(data.value),
      subtype: data.subtype,
      description: data.description || null,
      category: data.category || null,
    });
  };

  const handleClose = () => {
    form.reset({
      type: 'inflow',
      subtype: undefined,
      name: '',
      description: '',
      category: undefined,
      categoryName: '',
      value: '0',
    });
    setCategorySelectKey((+new Date()).toString());
    setSubtypeSelectKey((+new Date()).toString());
    onClose();
  };

  const handleRefetch = () => {
    refetch();
  };

  return {
    form,
    save: {
      isLoading: creationIsPeding || updateIsPeding,
      isError: creationIsError || updateIsError,
      handleSave,
    },
    show: {
      isLoading: showIsLoading,
      isError: showIsError,
      handleRefetch,
    },
    subtypeSelectKey,
    categorySelectKey,
    handleTypeChange,
    handleClose,
  };
};
