import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { listCashFlows } from '@/services/cashflow/cashFlow';

import { useToasterNotificationStore } from '@/store/toasterNotificationStore';

import { TOTAL_ITEMS_PER_PAGE } from '@/settings';

import { UseCashFlowsTableResult } from './types';

export const useCashFlowsTable = (): UseCashFlowsTableResult => {
  const showNotification = useToasterNotificationStore(
    (state) => state.showNotification,
  );

  const [search, setSearch] = useState('');
  const [ordering, setOrdering] = useState('');
  const [page, setPage] = useState(1);

  const [formModalIsOpen, setFormModalIsOpen] = useState(false);
  const [cashFlowId, setCashFlowId] = useState<string | undefined>();
  const [cashFlowDescription, setCashFlowDescription] = useState<
    string | undefined
  >();
  const [cashFlowOpeningBalance, setCashFlowOpeningBalance] = useState<
    string | undefined
  >();
  const [cashFlowYear, setCashFlowYear] = useState<string | undefined>();
  const [removeConfirmIsOpen, setRemoveConfirmIsOpen] = useState(false);
  const [activeConfirmIsOpen, setActiveConfirmIsOpen] = useState(false);

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['cash-flows', search, ordering, page],
    queryFn: () =>
      listCashFlows({
        search,
        ordering,
        page,
      }),
  });

  const handleOpenActiveConfirm = (id: string) => {
    setCashFlowId(id);
    setActiveConfirmIsOpen(true);
  };

  const handleActiveConfirmClose = () => {
    setActiveConfirmIsOpen(false);
    setCashFlowId(undefined);
  };

  const handleChangeSearch = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  const handleChangeOrdering = (value: string) => {
    setOrdering(value);
  };

  const handleRefetch = () => {
    refetch();
  };

  const pageCount = useMemo(() => {
    return Math.ceil(data?.count / TOTAL_ITEMS_PER_PAGE);
  }, [data?.count]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleOpenFormModal = (id?: string, description?: string) => {
    setCashFlowId(id);
    setCashFlowDescription(description);
    setFormModalIsOpen(true);
  };

  const handleOpenRemoveConfirm = (
    id: string,
    description: string,
    openingBalance: string,
    year: string,
  ) => {
    setCashFlowId(id);
    setCashFlowDescription(description);
    setCashFlowOpeningBalance(openingBalance);
    setCashFlowYear(year);
    setRemoveConfirmIsOpen(true);
  };

  const handleRemoveClose = () => {
    setRemoveConfirmIsOpen(false);
    setCashFlowId(undefined);
  };

  const handleFormClose = () => {
    setFormModalIsOpen(false);
    setCashFlowId(undefined);
  };

  return {
    data: data,
    isPending,
    isError,
    search,
    handleChangeSearch,
    ordering,
    handleChangeOrdering,
    handleRefetch,
    formModalIsOpen,
    page,
    handleChangePage,
    pageCount,
    handleOpenFormModal,
    id: cashFlowId,
    description: cashFlowDescription,
    openingBalance: cashFlowOpeningBalance,
    year: cashFlowYear,
    handleFormClose,
    removeConfirmIsOpen,
    handleOpenRemoveConfirm,
    handleRemoveClose,
    activeConfirmIsOpen,
    handleOpenActiveConfirm,
    handleActiveConfirmClose,
  };
};
