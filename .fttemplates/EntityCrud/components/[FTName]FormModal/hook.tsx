import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CheckFat } from '@phosphor-icons/react';

import {
  create[FTName],
  show[FTName],
  udpate[FTName],
} from '@/services/module/<FTName | camelcase>';

import useAuthUser from '@/hooks/useAuthUser';

import { useToasterNotificationStore } from '@/store/toasterNotificationStore';

import {
  Use[FTName]FormReturn,
  [FTName]FormSchema,
  <FTName | camelcase>FormSchema,
} from './types';
import { [FTName]Response } from '@/services/module/<FTName | camelcase>/types';

export const use[FTName]Form = (
  onClose: () => void,
  id?: string,
): Use[FTName]FormReturn => {
  const {
    company: { id: companyId },
  } = useAuthUser();
  const showNotification = useToasterNotificationStore(
    (state) => state.showNotification,
  );
  const queryClient = useQueryClient();

  const {
    data: showData,
    isError: showIsError,
    isLoading: showIsLoading,
    refetch,
  } = useQuery({
    queryKey: ['<FTName | paramcase>', id],
    queryFn: () => show[FTName](id || ''),
    enabled: !!id,
  });

  const <FTName | camelcase>Data = showData as [FTName]Response;

  const form = useForm<[FTName]FormSchema>({
    resolver: zodResolver(<FTName | camelcase>FormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (<FTName | camelcase>Data) {
      form.reset({
        name: <FTName | camelcase>Data.name,
        description: <FTName | camelcase>Data.description,
      });
    }
  }, [<FTName | camelcase>Data, form]);

  const {
    mutate: handleCreate[FTName],
    isPending: creationIsPeding,
    isError: creationIsError,
  } = useMutation({
    mutationFn: create[FTName],
    onSuccess: () => {
      showNotification({
        id: '<FTName | paramcase>-saved-notification',
        description: '[FTName] adicionado!',
        duration: 2000,
        theme: 'success',
        icon: <CheckFat />,
      });
      queryClient.invalidateQueries({ queryKey: ['<FTName | paramcase>s'] });
      handleClose();
    },
  });

  const {
    mutate: handleUpdate[FTName],
    isPending: updateIsPeding,
    isError: updateIsError,
  } = useMutation({
    mutationFn: udpate[FTName],
    onSuccess: () => {
      showNotification({
        id: '<FTName | paramcase>-saved-notification',
        description: '[FTName] atualizado!',
        duration: 2000,
        theme: 'success',
        icon: <CheckFat />,
      });
      queryClient.invalidateQueries({ queryKey: ['<FTName | paramcase>s'] });
      handleClose();
    },
  });

  const handleSave = async (data: [FTName]FormSchema) => {
    if (id) {
      handleUpdate[FTName]({
        id,
        name: data.name,
        description: data.description,
        company: companyId,
      });
      return;
    }

    handleCreate[FTName]({
      name: data.name,
      description: data.description,
      company: companyId,
    });
  };

  const handleClose = () => {
    form.reset({
      name: '',
      description: '',
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
