import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckFat } from '@phosphor-icons/react';

import { useToasterNotificationStore } from '@/store/toasterNotificationStore';

import { remove[FTName] } from '@/services/module/<FTName | camelcase>';

import { Use[FTName]FormReturn } from './types';

export const use[FTName]RemoveConfirm = (
  onClose: () => void,
  id: string,
): Use[FTName]FormReturn => {
  const showNotification = useToasterNotificationStore(
    (state) => state.showNotification,
  );
  const queryClient = useQueryClient();

  const {
    mutate: handleRemove[FTName],
    isPending: removeIsPeding,
    isError: removeIsError,
  } = useMutation({
    mutationFn: remove[FTName],
    onSuccess: () => {
      showNotification({
        id: '<FTName | paramcase>-saved-notification',
        description: '[FTName] removido.',
        duration: 2000,
        theme: 'success',
        icon: <CheckFat />,
      });
      queryClient.invalidateQueries({ queryKey: ['<FTName | paramcase>s'] });
      handleClose();
    },
  });

  const handleConfirm = async () => {
    handleRemove[FTName]({
      id,
    });
  };

  const handleClose = () => {
    onClose();
  };

  return {
    removeIsPeding,
    removeIsError,
    handleClose,
    handleConfirm,
  };
};
