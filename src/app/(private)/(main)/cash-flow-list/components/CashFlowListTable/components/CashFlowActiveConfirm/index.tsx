import { Button, Loader, AlertDialog } from 'nemea-ui';

import { cn } from '@/utils/cn';

import { useCashFlowActiveConfirm } from './hook';

import { CashFlowActiveConfirmProps } from './types';

export default function CashFlowActiveConfirm({
  className = '',
  id,
  onClose,
  open,
}: CashFlowActiveConfirmProps) {
  const { confirmIsPending, handleClose, handleConfirm } =
    useCashFlowActiveConfirm(onClose);

  return (
    <AlertDialog.Root
      open={open}
      className={cn(className)}
      contentClassName="w-full min-w-full md:min-w-[512px] max-w-[512px] flex flex-col relative"
      id={id}
    >
      <AlertDialog.Title>Ativar caixa</AlertDialog.Title>
      <AlertDialog.Description className="mt-1">
        Ao ativá-lo, este será seu caixa principal. O painel financeiro exibirá
        informações com base nas suas transações, e as futuras transações serão
        associadas a este caixa.
      </AlertDialog.Description>

      <div className="flex justify-between items-center mt-8 mb-4 md:!mb-0">
        <AlertDialog.Cancel>
          <Button.Root
            theme="grayPrimary"
            onClick={handleClose}
            disabled={confirmIsPending}
          >
            <Button.Label>Cancelar</Button.Label>
          </Button.Root>
        </AlertDialog.Cancel>
        <Button.Root
          theme="primary"
          disabled={confirmIsPending}
          onClick={() => handleConfirm(id)}
        >
          {confirmIsPending && (
            <Button.Icon className="relative -top-[2.5px]">
              <Loader color="white" size="xs" className="m-0" />
            </Button.Icon>
          )}
          <Button.Label>
            {confirmIsPending ? 'Ativando...' : 'Confirmar'}
          </Button.Label>
        </Button.Root>
      </div>
    </AlertDialog.Root>
  );
}
