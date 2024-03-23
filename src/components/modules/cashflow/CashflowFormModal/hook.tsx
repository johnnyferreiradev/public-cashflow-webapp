import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CheckFat } from '@phosphor-icons/react';

import {
  createCashFlow,
  showCashFlow,
  udpateCashFlow,
} from '@/services/cashflow/cashFlow';
import { setCashFlowCardType } from '@/services/localStorage/currentCashFlowCard';

import { useCashFlowStore } from '@/store/cashFlowStore';

import useAuthUser from '@/hooks/useAuthUser';

import { useToasterNotificationStore } from '@/store/toasterNotificationStore';

import { extractCurrencyValue } from '@/utils/currency';

import {
  CashFlowFormSchema,
  cashFlowFormSchema,
  UseCashFlowFormProps,
} from './types';
import { CashFlowResponse } from '@/services/cashflow/cashFlow/types';

export const useCashFlowForm = ({
  onClose,
  id,
  defaultActive,
  onSave,
  open,
}: UseCashFlowFormProps) => {
  const {
    company: { id: companyId },
  } = useAuthUser();
  const showNotification = useToasterNotificationStore(
    (state) => state.showNotification,
  );
  const queryClient = useQueryClient();
  const { setActiveCashFlowLoading, setActiveCashFlow } = useCashFlowStore(
    (state) => state,
  );

  const {
    data: showData,
    isError: showIsError,
    isLoading: showIsLoading,
    refetch,
  } = useQuery<CashFlowResponse>({
    queryKey: ['cash-flow', id],
    queryFn: () => showCashFlow(id || ''),
    enabled: !!id && open,
  });

  const form = useForm<CashFlowFormSchema>({
    resolver: zodResolver(cashFlowFormSchema),
    defaultValues: {
      description: '',
      isActive: !!defaultActive,
      openingBalance: '0',
    },
  });

  useEffect(() => {
    form.reset({
      description: showData?.description || form.getValues('description'),
      isActive: showData?.is_active || form.getValues('isActive'),
      openingBalance:
        showData?.opening_balance || form.getValues('openingBalance'),
    });
  }, [showData, form]);

  const {
    mutate: handleCreateCashFlow,
    isPending: creationIsPeding,
    isError: creationIsError,
  } = useMutation({
    mutationFn: createCashFlow,
    onSuccess: (data) => {
      showNotification({
        id: 'cash-flow-saved-notification',
        description: 'Caixa criado!',
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

      if (form.getValues('isActive')) {
        setActiveCashFlow({
          data: {
            balance: data?.balance || '0',
            createdAt: data?.created_at || '',
            description: data?.description || '',
            id: data?.id || '',
            openingBalance: data?.opening_balance || '0',
            totalInflow: data?.total_inflow || '0',
            totalOutflow: data?.total_outflow || '0',
            updatedAt: data?.updated_at || '',
          },
          hasActive: true,
          isError: false,
          isLoading: false,
          refetch,
        });
        setCashFlowCardType('open');
      }

      handleClose();
      onSave?.();
    },
  });

  const {
    mutate: handleUpdateCashFlow,
    isPending: updateIsPeding,
    isError: updateIsError,
  } = useMutation({
    mutationFn: udpateCashFlow,
    onSuccess: (data) => {
      showNotification({
        id: 'cash-flow-saved-notification',
        description: 'Caixa atualizado!',
        duration: 2000,
        theme: 'success',
        icon: <CheckFat />,
      });
      queryClient.invalidateQueries({
        queryKey: ['cash-flows'],
      });
      queryClient.invalidateQueries({
        queryKey: ['active-cash-flow'],
      });
      if (form.getValues('isActive')) {
        setActiveCashFlow({
          data: {
            balance: data?.balance || '0',
            createdAt: data?.created_at || '',
            description: data?.description || '',
            id: data?.id || '',
            openingBalance: data?.opening_balance || '0',
            totalInflow: data?.total_inflow || '0',
            totalOutflow: data?.total_outflow || '0',
            updatedAt: data?.updated_at || '',
          },
          hasActive: true,
          isError: false,
          isLoading: false,
          refetch,
        });
        setCashFlowCardType('open');
      }
      handleClose();
      onSave?.();
    },
  });

  const handleSave = async (data: CashFlowFormSchema) => {
    if (id) {
      handleUpdateCashFlow({
        id,
        description: data.description,
        opening_balance: extractCurrencyValue(data.openingBalance),
        is_active: data.isActive,
        company: companyId,
      });
      return;
    }

    handleCreateCashFlow({
      description: data.description,
      opening_balance: extractCurrencyValue(data.openingBalance),
      is_active: data.isActive,
      company: companyId,
    });
  };

  const handleClose = () => {
    form.reset({
      description: '',
      openingBalance: '',
      isActive: false,
    });
    onClose();
  };

  const handleRefetch = () => {
    refetch();
  };

  return {
    form,
    handleSave,
    saveIsPeding: creationIsPeding || updateIsPeding,
    saveIsError: creationIsError || updateIsError,
    handleClose,
    showIsLoading,
    showIsError,
    handleRefetch,
  };
};
