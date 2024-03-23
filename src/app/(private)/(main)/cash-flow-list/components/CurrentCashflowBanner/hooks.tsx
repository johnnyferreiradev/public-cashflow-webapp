import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Equals } from '@phosphor-icons/react';

import { useCashFlowStore } from '@/store/cashFlowStore';

import { CashFlowDataState } from '@/store/cashFlowStore/types';
import {
  getCashFlowCardType,
  setCashFlowCardType,
} from '@/services/localStorage/currentCashFlowCard';

export const useCurrentCashFlowBanner = () => {
  const {
    activeCashFlow: { data, isError: showIsError, isLoading: showIsLoading },
    refetchActiveCashFlow,
  } = useCashFlowStore((state) => state);

  const [openIsLoading, setOpenIsLoading] = useState(false);

  const statusIcons = {
    positive: <ArrowUp size={18} weight="bold" className="text-success-400" />,
    negative: (
      <ArrowDown size={18} weight="bold" className="text-failure-400" />
    ),
    equal: <Equals size={18} weight="bold" className="text-primary-400" />,
  };

  const balanceBegde = useMemo(() => {
    const cashflowData: CashFlowDataState | null = data;

    if (!cashflowData) return '';
    const floatBalance = parseFloat(cashflowData.balance);

    if (floatBalance > 0) return statusIcons.positive;
    if (floatBalance < 0) return statusIcons.negative;
    return statusIcons.equal;
  }, [data, statusIcons.positive, statusIcons.negative, statusIcons.equal]);

  const continueCardLabels = useMemo(() => {
    const type = getCashFlowCardType();

    if (type === 'stop') {
      return {
        labelText: 'Continue de onde parou',
        buttonText: 'Continuar',
      };
    }

    if (type === 'continue') {
      return {
        labelText: 'Seu caixa foi fechado',
        buttonText: 'Reabrir caixa',
      };
    }

    return {
      labelText: 'Inicie a operação do dia',
      buttonText: 'Abrir caixa',
    };
  }, []);

  const continueOnClick = () => {
    setCashFlowCardType('stop');
    setOpenIsLoading(true);
  };

  const handleRefetch = () => {
    refetchActiveCashFlow();
  };

  return {
    data: data && Object.keys(data).length > 0 ? data : null,
    showIsLoading,
    showIsError,
    handleRefetch,
    balanceBegde,
    continueCardLabels,
    continueOnClick,
    openIsLoading,
  };
};
