import { ArrowCounterClockwise, SmileySad } from '@phosphor-icons/react';
import { Alert, Button, Loader, AlertDialog } from 'nemea-ui';

import { cn } from '@/utils/cn';

import { useCategoryRemoveConfirm } from './hook';

import { CategoryRemoveConfirmProps } from './types';

export default function CategoryRemoveConfirm({
  className = '',
  id,
  name,
  open,
  onClose,
}: CategoryRemoveConfirmProps) {
  const {
    removeIsPeding,
    removeIsError,
    handleClose,
    showIsError,
    showIsLoading,
    handleRefetch,
    handleConfirm,
  } = useCategoryRemoveConfirm(onClose, id);

  return (
    <AlertDialog.Root
      open={open}
      className={cn(className)}
      contentClassName="w-full min-w-full md:min-w-[512px] max-w-[512px] flex flex-col relative"
      id={id}
    >
      {!showIsLoading && !showIsError && (
        <>
          <AlertDialog.Title>Remover Categoria</AlertDialog.Title>
          <AlertDialog.Description className="mt-1 w-11/12 pr-2">
            Tem certeza que deseja remover a categoria {name}?
          </AlertDialog.Description>

          {removeIsError && (
            <Alert.Root className="mt-8" theme="failure">
              <Alert.Icon>
                <SmileySad />
              </Alert.Icon>
              <Alert.Content>
                <Alert.Title>Ops! Algo está errado.</Alert.Title>
                <Alert.Description>
                  Ocorreu um inesperado ao tentar remover a categoria. Tente
                  novamente ou, se o problema persistir, contate o suporte.
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
          )}
        </>
      )}

      {showIsError && (
        <Alert.Root className="mt-16 mb-12" theme="failure">
          <Alert.Icon>
            <SmileySad />
          </Alert.Icon>
          <Alert.Content>
            <Alert.Title>Ops! Algo está errado.</Alert.Title>
            <Alert.Description>
              Ocorreu um inesperado ao carregar os dados da categoria. Tente
              novamente.
            </Alert.Description>
          </Alert.Content>
          <Alert.Actions className="flex items-center justify-center -translate-x-7">
            <Button.Root
              theme="failure"
              className="my-4"
              onClick={handleRefetch}
            >
              <Button.Icon>
                <ArrowCounterClockwise />
              </Button.Icon>
              <Button.Label>Tentar novamente</Button.Label>
            </Button.Root>
          </Alert.Actions>
        </Alert.Root>
      )}

      {showIsLoading && (
        <div className="w-full my-4 flex flex-col items-center justify-center gap-4">
          <Loader size="lg" />
          <p className="text-lg font-semibold">
            Verificando usos da categoria...
          </p>
        </div>
      )}

      {!showIsLoading && (
        <div className="flex justify-between items-center mt-8 mb-4 md:!mb-0">
          <AlertDialog.Cancel>
            <Button.Root
              theme="grayPrimary"
              onClick={handleClose}
              disabled={removeIsPeding}
            >
              <Button.Label>Cancelar</Button.Label>
            </Button.Root>
          </AlertDialog.Cancel>
          {!showIsError && (
            <Button.Root
              theme="failure"
              disabled={removeIsPeding}
              onClick={handleConfirm}
            >
              {removeIsPeding && (
                <Button.Icon className="relative -top-[2.5px]">
                  <Loader color="white" size="xs" className="m-0" />
                </Button.Icon>
              )}
              <Button.Label>
                {removeIsPeding ? 'Removendo...' : 'Remover'}
              </Button.Label>
            </Button.Root>
          )}
        </div>
      )}
    </AlertDialog.Root>
  );
}
