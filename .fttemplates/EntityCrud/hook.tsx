import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { list[FTName] } from '@/services/module/<FTName | camelcase>';

import { TOTAL_ITEMS_PER_PAGE } from '@/settings';

import { [FTName]sTableFilter, Use[FTName]sTableResult } from './types';

export const use[FTName]sTable = (): Use[FTName]sTableResult => {
  const [search, setSearch] = useState('');
  const [ordering, setOrdering] = useState('');
  const [filters, setFilters] = useState<[FTName]sTableFilter>({
    type: undefined,
    subtype: undefined,
  });
  const [page, setPage] = useState(1);

  const [formModalIsOpen, setFormModalIsOpen] = useState(false);
  const [<FTName | camelcase>Id, set[FTName]Id] = useState<string | undefined>();
  const [<FTName | camelcase>Name, set[FTName]Name] = useState<string | undefined>();
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [removeConfirmIsOpen, setRemoveConfirmIsOpen] = useState(false);

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['<FTName | paramcase>s', search, ordering, filters, page],
    queryFn: () =>
      list[FTName]({
        search,
        ordering,
        filters,
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

  const handleApplyFilters = (newFilter: [FTName]sTableFilter) => {
    setPage(1);
    setFilters(newFilter);
  };

  const filterCount = useMemo(() => {
    return Object.values(filters).filter((item) => item !== undefined).length;
  }, [filters]);

  const pageCount = useMemo(() => {
    return Math.ceil(data?.count / TOTAL_ITEMS_PER_PAGE);
  }, [data?.count]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleOpenFormModal = (id?: string, name?: string) => {
    set[FTName]Id(id);
    set[FTName]Name(name);
    setFormModalIsOpen(true);
  };

  const handleOpenRemoveConfirm = (id: string, name: string) => {
    set[FTName]Id(id);
    set[FTName]Name(name);
    setRemoveConfirmIsOpen(true);
  };

  const handleRemoveClose = () => {
    setRemoveConfirmIsOpen(false);
    set[FTName]Id(undefined);
  };

  const handleFormClose = () => {
    setFormModalIsOpen(false);
    set[FTName]Id(undefined);
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
    filterModalIsOpen,
    setFilterModalIsOpen,
    handleApplyFilters,
    filters,
    filterCount,
    page,
    handleChangePage,
    pageCount,
    handleOpenFormModal,
    id: <FTName | camelcase>Id,
    name: <FTName | camelcase>Name,
    handleFormClose,
    removeConfirmIsOpen,
    handleOpenRemoveConfirm,
    handleRemoveClose,
  };
};
