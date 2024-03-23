import { getActiveCashFlowStatistics } from '@/services/cashflow/cashFlow';
import { ActiveCashFlowLastPeriodTransactionsResponse } from '@/services/cashflow/cashFlow/types';
import {
  getCurrentDayAndMonth,
  getCurrentMonthAndYearDate,
  getLastXDaysDate,
  getLastXMonthsDate,
} from '@/utils/date';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

export const useInflowOutflowChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    'last12months' | 'last30days'
  >('last12months');

  const { data, isLoading, isError, refetch } =
    useQuery<ActiveCashFlowLastPeriodTransactionsResponse>({
      queryKey: ['get-last-period-transactions-statistics', selectedPeriod],
      queryFn: () => getActiveCashFlowStatistics({ period: selectedPeriod }),
    });

  const periods = useMemo(() => {
    if (data && data.length > 0) {
      return data.map((period) => ({
        name: period.period,
        outflow: period.total_outflow,
        inflow: period.total_inflow,
        amt: period.total_outflow,
      }));
    }
    return [];
  }, [data]);

  const periodLabel = useMemo(() => {
    if (selectedPeriod === 'last12months') {
      return `De ${getLastXMonthsDate(11)} à ${getCurrentMonthAndYearDate()}`;
    }
    return `De ${getLastXDaysDate(29)} à ${getCurrentDayAndMonth()}`;
  }, [selectedPeriod]);

  const handleChangePeriod = (period: string) => {
    setSelectedPeriod(period as 'last12months' | 'last30days');
  };

  return {
    periods,
    periodLabel,
    selectedPeriod,
    handleChangePeriod,
    isLoading,
    isError,
    refetch,
  };
};
