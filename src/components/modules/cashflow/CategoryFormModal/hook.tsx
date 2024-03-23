import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CheckFat } from '@phosphor-icons/react';

import { useToasterNotificationStore } from '@/store/toasterNotificationStore';

import {
  createTransactionCategory,
  showTransactionCategory,
  udpateTransactionCategory,
} from '@/services/cashflow/transactionCategory';

import useAuthUser from '@/hooks/useAuthUser';

import { CategoryFormSchema, categoryFormSchema } from './types';
import { TransactionCategoryResponse } from '@/services/cashflow/transactionCategory/types';

export const useCategoryForm = ({
  onClose,
  open,
  id,
}: {
  open: boolean;
  onClose: (category?: { id: string; name: string }) => void;
  id?: string;
}) => {
  const {
    company: { id: companyId },
  } = useAuthUser();
  const showNotification = useToasterNotificationStore(
    (state) => state.showNotification,
  );
  const queryClient = useQueryClient();

  const {
    data: showData,
    isError: showIsError,
    isLoading: showIsLoading,
    refetch,
  } = useQuery<TransactionCategoryResponse>({
    queryKey: ['transaction-category', id],
    queryFn: () => showTransactionCategory(id || ''),
    enabled: !!id && open,
  });

  const form = useForm<CategoryFormSchema>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const {
    mutate: handleCreateCategory,
    isPending: creationIsPeding,
    isError: creationIsError,
  } = useMutation({
    mutationFn: createTransactionCategory,
    onSuccess: (response) => {
      showNotification({
        id: 'category-saved-notification',
        description: 'Categoria adicionada!',
        duration: 2000,
        theme: 'success',
        icon: <CheckFat />,
      });
      queryClient.invalidateQueries({ queryKey: ['transaction-categories'] });
      form.reset({
        name: '',
        description: '',
      });
      onClose(response);
    },
  });

  const {
    mutate: handleUpdateCategory,
    isPending: updateIsPeding,
    isError: updateIsError,
  } = useMutation({
    mutationFn: udpateTransactionCategory,
    onSuccess: (response) => {
      showNotification({
        id: 'category-saved-notification',
        description: 'Categoria atualizada!',
        duration: 2000,
        theme: 'success',
        icon: <CheckFat />,
      });
      queryClient.invalidateQueries({ queryKey: ['transaction-categories'] });
      form.reset({
        name: '',
        description: '',
      });
      onClose(response);
    },
  });

  useEffect(() => {
    if (!!id && open) {
      form.reset({
        name: showData?.name || '',
        description: showData?.description || '',
      });
    }
  }, [form, showData, id, open]);

  const handleSave = async (data: CategoryFormSchema) => {
    if (id) {
      handleUpdateCategory({
        ...data,
        id,
        company: companyId,
      });
      return;
    }

    handleCreateCategory({
      ...data,
      company: companyId,
    });
  };

  const handleClose = () => {
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
    handleClose,
  };
};
