import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { listTransactionCategories } from '@/services/cashflow/transactionCategory';

import { TOTAL_ITEMS_PER_PAGE } from '@/settings';
import { TransactionCategoriesResponse } from '@/services/cashflow/transactionCategory/types';

export const useCategoriesTable = () => {
  const [search, setSearch] = useState('');
  const [ordering, setOrdering] = useState('');
  const [page, setPage] = useState(1);

  const [formModalIsOpen, setFormModalIsOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [categoryName, setCategoryName] = useState<string | undefined>();
  const [removeConfirmIsOpen, setRemoveConfirmIsOpen] = useState(false);

  const { data, isPending, isError, refetch } =
    useQuery<TransactionCategoriesResponse>({
      queryKey: ['transaction-categories', search, ordering, page],
      queryFn: () =>
        listTransactionCategories({
          search,
          ordering,
          page,
        }),
    });

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
    if (!data?.count) return 0;
    return Math.ceil(data?.count / TOTAL_ITEMS_PER_PAGE);
  }, [data?.count]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleOpenFormModal = (id?: string, name?: string) => {
    setCategoryId(id);
    setCategoryName(name);
    setFormModalIsOpen(true);
  };

  const handleOpenRemoveConfirm = (id: string, name: string) => {
    setCategoryId(id);
    setCategoryName(name);
    setRemoveConfirmIsOpen(true);
  };

  const handleRemoveClose = () => {
    setRemoveConfirmIsOpen(false);
    setCategoryId(undefined);
  };

  const handleFormClose = () => {
    setFormModalIsOpen(false);
    setCategoryId(undefined);
  };

  return {
    data,
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
    categoryId,
    categoryName,
    handleFormClose,
    removeConfirmIsOpen,
    handleOpenRemoveConfirm,
    handleRemoveClose,
  };
};
