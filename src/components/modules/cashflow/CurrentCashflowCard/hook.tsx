import { getActiveCashFlowStatistics } from '@/services/cashflow/cashFlow';
import { ActiveCashFlowDateTransactionsResponse } from '@/services/cashflow/cashFlow/types';
import {
  getCashFlowCardType,
  getLastOperationDate,
  setCashFlowCardType,
  setLastOperationDate,
} from '@/services/localStorage/currentCashFlowCard';
import { getLongLocalizedDate } from '@/utils/date';
import { ArrowDown, ArrowUp, Equals } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export const useCurrentCashFlowCard = () => {
  const searchParams = useSearchParams();

  const currentDateLabel = getLongLocalizedDate(Date.now());
  const statusIcons = {
    positive: <ArrowUp size={18} weight="bold" className="text-success-400" />,
    negative: (
      <ArrowDown size={18} weight="bold" className="text-failure-400" />
    ),
    equal: <Equals size={18} weight="bold" className="text-primary-400" />,
  };

  const [type, setType] = useState<'open' | 'continue' | 'stop'>('open');
  const [buttonLoading, setButtonLoading] = useState(false);

  const currentDate = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return searchParams.get('date') || today;
  }, [searchParams]);

  const { data, isLoading, isError, refetch } =
    useQuery<ActiveCashFlowDateTransactionsResponse>({
      queryKey: ['get-date-transactions-statistics', currentDate],
      queryFn: () =>
        getActiveCashFlowStatistics({
          date: currentDate || undefined,
        }),
    });

  const balanceStatus = useMemo(() => {
    if (!data) return 'equal';
    if (parseFloat(data.balance) > 0) {
      return 'positive';
    }
    if (parseFloat(data.balance) < 0) {
      return 'negative';
    }
    return 'equal';
  }, [data]);

  const onOpen = () => {
    setCashFlowCardType('stop');
    setType('stop');
    setButtonLoading(true);
  };

  const onClose = () => {
    setCashFlowCardType('continue');
    setType('continue');
    setButtonLoading(true);
  };

  const onReOpen = () => {
    setCashFlowCardType('stop');
    setType('stop');
    setButtonLoading(true);
  };

  const onContinue = () => {
    setCashFlowCardType('stop');
    setType('stop');
    setButtonLoading(true);
  };

  useEffect(() => {
    const lastOperationDate = getLastOperationDate();
    const today = new Date().toLocaleDateString();
    if (lastOperationDate !== today) {
      setCashFlowCardType('open');
      setLastOperationDate();
      setType('open');
      return;
    }

    setType(getCashFlowCardType() || 'open');
  }, []);

  return {
    currentDateLabel,
    statusIcons,
    data,
    isLoading,
    isError,
    refetch,
    balanceStatus,
    type,
    onOpen,
    onClose,
    onReOpen,
    onContinue,
    buttonLoading,
  };
};
