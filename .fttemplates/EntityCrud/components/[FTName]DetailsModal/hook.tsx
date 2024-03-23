import { useQuery } from '@tanstack/react-query';

import { show[FTName] } from '@/services/module/<FTName | camelcase>';

import { Use[FTName]FormReturn } from './types';

export const use[FTName]Form = (id: string): Use[FTName]FormReturn => {
  const {
    data,
    isError: showIsError,
    isLoading: showIsLoading,
    refetch,
  } = useQuery({
    queryKey: [<FTName | snakecase>, id],
    queryFn: () => show[FTName](id),
  });

  const handleRefetch = () => {
    refetch();
  };

  return {
    data,
    showIsLoading,
    showIsError,
    handleRefetch,
  };
};
