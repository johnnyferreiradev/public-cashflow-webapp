import { SmileySad } from '@phosphor-icons/react';
import { Alert, Button, Loader, AlertDialog } from 'nemea-ui';

import { cn } from '@/utils/cn';

import { use[FTName]RemoveConfirm } from './hook';

import { [FTName]RemoveConfirmProps } from './types';

export default function [FTName]RemoveConfirm({
  className = '',
  id,
  name,
  open,
  onClose,
}: [FTName]RemoveConfirmProps) {
  const { removeIsPeding, removeIsError, handleClose, handleConfirm } =
    use[FTName]RemoveConfirm(onClose, id);

  return (
    <AlertDialog.Root
      open={open}
      className={cn(className)}
      contentClassName="w-full min-w-full md:min-w-[512px] max-w-[512px] flex flex-col relative"
      id={id}
    >
      <AlertDialog.Title>Remover <FTName | lowercase></AlertDialog.Title>
      <AlertDialog.Description className="mt-1 w-11/12 pr-2">
        Tem certeza que deseja remover o <FTName | lowercase> {name}?
      </AlertDialog.Description>

      {removeIsError && (
        <Alert.Root className="mt-8" theme="failure">
          <Alert.Icon>
            <SmileySad />
          </Alert.Icon>
          <Alert.Content>
            <Alert.Title>Ops! Algo está errado.</Alert.Title>
            <Alert.Description>
              Ocorreu um inesperado ao tentar remover o <FTName | lowercase>. Tente
              novamente ou, se o problema persistir, contate o suporte.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

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
      </div>
    </AlertDialog.Root>
  );
}
