import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckFat, SmileySad } from '@phosphor-icons/react';

import { useToasterNotificationStore } from '@/store/toasterNotificationStore';
import { useCashFlowStore } from '@/store/cashFlowStore';

import { udpateCashFlow } from '@/services/cashflow/cashFlow';
import { setCashFlowCardType } from '@/services/localStorage/currentCashFlowCard';

import { UseCashFlowActiveConfirmReturn } from './types';

export const useCashFlowActiveConfirm = (
  onClose: () => void,
): UseCashFlowActiveConfirmReturn => {
  const showNotification = useToasterNotificationStore(
    (state) => state.showNotification,
  );
  const queryClient = useQueryClient();
  const { setActiveCashFlowLoading } = useCashFlowStore((state) => state);

  const { mutate: handleActiveCashFlow, isPending: confirmIsPending } =
    useMutation({
      mutationFn: udpateCashFlow,
      onSuccess: () => {
        showNotification({
          id: 'cash-flow-activated-notification',
          description: 'Caixa ativado!',
          duration: 2000,
          theme: 'success',
          icon: <CheckFat />,
        });
        setActiveCashFlowLoading(true);
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ['cash-flows'],
          }),
          queryClient.invalidateQueries({
            queryKey: ['active-cash-flow'],
          }),
        ]);
        setCashFlowCardType('open');
        handleClose();
      },
      onError: () => {
        showNotification({
          id: 'cash-flow-active-error-notification',
          title: 'Algo não está certo',
          description: 'Ocorreu um erro ao ativar o caixa',
          duration: 2000,
          theme: 'failure',
          icon: <SmileySad />,
        });
      },
    });

  const handleConfirm = (id: string) => {
    handleActiveCashFlow({ id, is_active: true });
  };

  const handleClose = () => {
    onClose();
  };

  return {
    handleClose,
    confirmIsPending,
    handleConfirm,
  };
};
