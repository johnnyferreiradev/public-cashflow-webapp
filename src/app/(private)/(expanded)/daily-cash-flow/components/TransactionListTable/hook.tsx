import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { listTransactions } from '@/services/cashflow/transaction';

import { TransactionsResponse } from '@/services/cashflow/transaction/types';
import { TransactionsTableFilter } from './types';

const TOTAL_ITEMS_PER_PAGE = 10;

export const useTransactionsTable = () => {
  const searchParams = useSearchParams();

  const date = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return searchParams.get('date') || today;
  }, [searchParams]);

  const [transaction, setTransaction] = useState<{
    id?: string;
    name?: string;
  }>({
    id: '',
    name: '',
  });
  const [category, setCategory] = useState<
    | {
        id: string;
        name: string;
      }
    | undefined
  >();
  const [filters, setFilters] = useState<TransactionsTableFilter>({
    search: '',
    ordering: [],
    page: 1,
    type: undefined,
    subtype: undefined,
    category: undefined,
    categoryName: undefined,
    date: undefined,
  });
  const [actions, setActions] = useState({
    form: {
      isOpen: false,
    },
    details: {
      isOpen: false,
    },
    filter: {
      isOpen: false,
    },
    category: {
      isOpen: false,
    },
  });

  const { data, isPending, isError, refetch } = useQuery<TransactionsResponse>({
    queryKey: ['date-transactions', filters],
    queryFn: () =>
      listTransactions({
        search: filters.search,
        ordering: filters.ordering.toString(),
        filters: {
          category: filters.category,
          type: filters.type,
          subtype: filters.subtype,
        },
        page: filters.page,
        page_size: TOTAL_ITEMS_PER_PAGE,
        date: filters.date,
      }),
  });

  useEffect(() => {
    setFilters((lastFilters) => ({ ...lastFilters, date: date || undefined }));
  }, [date]);

  const totalFilters = useMemo(() => {
    const currentFilters = {
      type: filters.type,
      category: filters.category,
      subtype: filters.subtype,
    };
    return Object.values(currentFilters).filter((item) => item !== undefined)
      .length;
  }, [filters]);

  const pageCount = useMemo(() => {
    if (!data?.count) return 1;
    return Math.ceil(data?.count / TOTAL_ITEMS_PER_PAGE);
  }, [data?.count]);

  const onChangeSearch = (value: string) => {
    setFilters({ ...filters, search: value });
  };

  const onChangeOrdering = (value: string, key: string) => {
    const currentOrdering = [...filters.ordering];

    let elementIndex = -1;

    if (value === '') {
      elementIndex = currentOrdering.indexOf(key);
      currentOrdering.splice(elementIndex, elementIndex === -1 ? 0 : 1);
    }

    if (value === key) {
      elementIndex = currentOrdering.indexOf(`-${key}`);
      if (elementIndex !== -1) {
        currentOrdering[elementIndex] = key;
      }
    }

    if (value === `-${key}`) {
      currentOrdering.push(`-${key}`);
    }

    setFilters({ ...filters, ordering: currentOrdering });
  };

  const getOrderingValue = useCallback(
    (key: string) => {
      const { ordering } = filters;
      const includeKey =
        !ordering.includes(`-${key}`) && ordering.includes(key);
      const includeNegativeKey = ordering.includes(`-${key}`);

      if (includeKey) return key;
      if (includeNegativeKey) return `-${key}`;

      return '';
    },
    [filters],
  );

  const onChangeFilters = (newFilter: TransactionsTableFilter) => {
    setFilters({
      ...filters,
      category: newFilter.category,
      categoryName: newFilter.categoryName,
      type: newFilter.type,
      subtype: newFilter.subtype,
    });
    setActions({
      ...actions,
      filter: {
        ...actions.filter,
        isOpen: false,
      },
    });
  };

  const onChangePage = (page: number) => {
    setFilters({
      ...filters,
      page,
    });
  };

  const handleOpenForm = (id?: string, name?: string) => {
    setTransaction({
      id,
      name,
    });
    setActions({
      ...actions,
      form: {
        ...actions.form,
        isOpen: true,
      },
    });
  };

  const handleCloseForm = () => {
    setTransaction({
      id: undefined,
      name: undefined,
    });
    setActions({
      ...actions,
      form: {
        ...actions.form,
        isOpen: false,
      },
    });
  };

  const handleOpenDetails = (id?: string, name?: string) => {
    setTransaction({
      id,
      name,
    });
    setActions({
      ...actions,
      details: {
        ...actions.details,
        isOpen: true,
      },
    });
  };

  const handleCloseDetails = () => {
    setTransaction({
      id: undefined,
      name: undefined,
    });
    setActions({
      ...actions,
      details: {
        ...actions.details,
        isOpen: false,
      },
    });
  };

  const handleOpenFilter = () => {
    setActions({
      ...actions,
      filter: {
        ...actions.filter,
        isOpen: true,
      },
    });
  };

  const handleCloseFilter = () => {
    setActions({
      ...actions,
      filter: {
        ...actions.filter,
        isOpen: false,
      },
    });
  };

  const handleOpenCategoryForm = () => {
    const currentActions = { ...actions };

    setActions({
      ...currentActions,
      form: {
        ...actions.form,
        isOpen: false,
      },
    });
    setTimeout(() => {
      setActions({
        ...currentActions,
        category: {
          ...currentActions.category,
          isOpen: true,
        },
        form: {
          ...currentActions.form,
          isOpen: false,
        },
      });
    }, 150);
  };

  const handleCloseCategoryForm = (category?: { id: string; name: string }) => {
    const currentActions = { ...actions };

    if (category) {
      setCategory({
        id: category.id,
        name: category.name,
      });
    }

    setActions({
      ...currentActions,
      category: {
        ...actions.category,
        isOpen: false,
      },
    });
    setTimeout(() => {
      setActions({
        ...currentActions,
        form: {
          ...currentActions.form,
          isOpen: true,
        },
        category: {
          ...currentActions.category,
          isOpen: false,
        },
      });
    }, 150);
  };

  const handleRefetch = () => {
    refetch();
  };

  return {
    transaction,
    category,
    data,
    isLoading: isPending,
    isError,
    handleRefetch,
    getOrderingValue,
    filters: {
      search: filters.search,
      ordering: filters.ordering,
      page: filters.page,
      pageCount,
      category: filters.category,
      categoryName: filters.categoryName,
      type: filters.type,
      subtype: filters.subtype,
      totalFilters,
      onChangeSearch,
      onChangeOrdering,
      onChangeFilters,
      onChangePage,
    },
    actions: {
      form: {
        isOpen: actions.form.isOpen,
        handleOpen: handleOpenForm,
        handleClose: handleCloseForm,
      },
      details: {
        isOpen: actions.details.isOpen,
        handleOpen: handleOpenDetails,
        handleClose: handleCloseDetails,
      },
      filter: {
        isOpen: actions.filter.isOpen,
        handleOpen: handleOpenFilter,
        handleClose: handleCloseFilter,
      },
      category: {
        isOpen: actions.category.isOpen,
        handleOpen: handleOpenCategoryForm,
        handleClose: handleCloseCategoryForm,
      },
    },
  };
};
