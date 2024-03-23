import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CheckFat } from '@phosphor-icons/react';

import { useToasterNotificationStore } from '@/store/toasterNotificationStore';

import {
  removeTransactionCategory,
  showTransactionCategory,
} from '@/services/cashflow/transactionCategory';

export const useCategoryRemoveConfirm = (onClose: () => void, id: string) => {
  const showNotification = useToasterNotificationStore(
    (state) => state.showNotification,
  );
  const queryClient = useQueryClient();

  const {
    isError: showIsError,
    isLoading: showIsLoading,
    refetch,
  } = useQuery({
    queryKey: ['transaction-category', id],
    queryFn: () => showTransactionCategory(id),
  });

  const {
    mutate: handleRemoveTransactionCategory,
    isPending: removeIsPeding,
    isError: removeIsError,
  } = useMutation({
    mutationFn: removeTransactionCategory,
    onSuccess: () => {
      showNotification({
        id: 'category-saved-notification',
        description: 'Categoria removida.',
        duration: 2000,
        theme: 'success',
        icon: <CheckFat />,
      });
      queryClient.invalidateQueries({ queryKey: ['transaction-categories'] });
      handleClose();
    },
  });

  const handleConfirm = async () => {
    handleRemoveTransactionCategory({
      id,
    });
  };

  const handleClose = () => {
    onClose();
  };

  const handleRefetch = () => {
    refetch();
  };

  return {
    removeIsPeding,
    removeIsError,
    handleClose,
    showIsLoading,
    showIsError,
    handleRefetch,
    handleConfirm,
  };
};
