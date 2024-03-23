import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckFat } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToasterNotificationStore } from '@/store/toasterNotificationStore';

import { removeCashFlow } from '@/services/cashflow/cashFlow';

import {
  CashFlowRemoveSchema,
  UseCashFlowFormReturn,
  cashFlowRemoveSchema,
} from './types';
import { extractCurrencyValue } from '@/utils/currency';

export const useCashFlowRemoveConfirm = (
  onClose: () => void,
  id: string,
  openingBalance: string,
  year: string,
): UseCashFlowFormReturn => {
  const showNotification = useToasterNotificationStore(
    (state) => state.showNotification,
  );
  const queryClient = useQueryClient();

  const form = useForm<CashFlowRemoveSchema>({
    resolver: zodResolver(cashFlowRemoveSchema),
    defaultValues: {
      year: '',
      openingBalance: '',
    },
  });

  const {
    mutate: handleRemoveCashFlow,
    isPending: removeIsPeding,
    isError: removeIsError,
  } = useMutation({
    mutationFn: removeCashFlow,
    onSuccess: () => {
      showNotification({
        id: 'cash-flow-removed-notification',
        description: 'Caixa removido.',
        duration: 2000,
        theme: 'success',
        icon: <CheckFat />,
      });
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['cash-flows'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['active-cash-flow'],
        }),
      ]);
      handleClose();
    },
  });

  const handleConfirm = async (data: CashFlowRemoveSchema) => {
    if (
      extractCurrencyValue(data.openingBalance) !==
      extractCurrencyValue(openingBalance)
    ) {
      form.setError('openingBalance', {
        message: 'Este valor não confere',
      });
      return;
    }

    if (data.year !== year) {
      form.setError('year', {
        message: 'O ano não confere',
      });
      return;
    }

    handleRemoveCashFlow({
      id,
    });
  };

  const handleClose = () => {
    onClose();
  };

  return {
    form,
    removeIsPeding,
    removeIsError,
    handleClose,
    handleConfirm,
  };
};
