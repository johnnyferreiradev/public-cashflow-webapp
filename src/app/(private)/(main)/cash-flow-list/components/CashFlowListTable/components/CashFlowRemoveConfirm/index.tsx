import { SmileySad } from '@phosphor-icons/react';
import { Alert, Button, Loader, AlertDialog, Input } from 'nemea-ui';

import { cn } from '@/utils/cn';

import { useCashFlowRemoveConfirm } from './hook';

import CurrencyInput from '@/components/ui/CurrencyInput';
import { Form } from '@/components/ui/Form';

import { CashFlowRemoveConfirmProps } from './types';

export default function CashFlowRemoveConfirm({
  className = '',
  id,
  openingBalance,
  year,
  open,
  onClose,
}: CashFlowRemoveConfirmProps) {
  const { form, removeIsPeding, removeIsError, handleClose, handleConfirm } =
    useCashFlowRemoveConfirm(onClose, id, openingBalance, year);

  return (
    <AlertDialog.Root
      open={open}
      className={cn(className)}
      contentClassName="w-full min-w-full md:min-w-[512px] max-w-[512px] flex flex-col relative"
      id={id}
    >
      <AlertDialog.Title>Remover caixa</AlertDialog.Title>

      {removeIsError && (
        <Alert.Root className="mt-8" theme="failure">
          <Alert.Icon>
            <SmileySad />
          </Alert.Icon>
          <Alert.Content>
            <Alert.Title>Ops! Algo está errado.</Alert.Title>
            <Alert.Description>
              Ocorreu um inesperado ao tentar remover o caixa. Tente
              novamente ou, se o problema persistir, contate o suporte.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      <Alert.Root className="mt-8" theme="failure">
        <Alert.Content className="p-0">
          <Alert.Title>ATENÇÃO!</Alert.Title>
          <Alert.Description className="flex flex-col gap-4 mt-4">
            <p>
              Ao excluir este caixa, você irá realizar a exclusão de
              dados associados, incluindo transações, estatísticas e outras
              informações relevantes.
            </p>

            <p>
              Certifique-se de revisar cuidadosamente as consequências da
              exclusão, pois ela impactará:
            </p>

            <ul className="pl-4 list-disc">
              <li className="font-semibold">Histórico de transações;</li>
              <li className="font-semibold">
                Dados estatísticos e analíticos;
              </li>
              <li className="font-semibold">
                Qualquer informação associada a este caixa.
              </li>
            </ul>
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>

      <p className="my-4 mt-8">
        Se você desejar prosseguir com a exclusão, por favor, confirme inserindo
        o saldo inicial do caixa e o ano de início da operação:
      </p>

      <Form.Root {...form}>
        <form
          className="flex gap-5 mt-4 h-full flex-col"
          onSubmit={form.handleSubmit(handleConfirm)}
        >
          <div className="flex gap-3 flex-col md:!flex-row">
            <Form.Field
              control={form.control}
              name="openingBalance"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>
                    Saldo inicial{' '}
                    <span className="text-failure-500 font-bold">*</span>
                  </Form.Label>
                  <Form.Control>
                    <CurrencyInput
                      placeholder="R$ 0,00"
                      theme="gray"
                      {...field}
                      disabled={removeIsPeding}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Form.Field
              control={form.control}
              name="year"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>
                    Ano de início da operação{' '}
                    <span className="text-failure-500 font-bold">*</span>
                  </Form.Label>
                  <Form.Control>
                    <Input
                      placeholder="Ex: 2024"
                      theme="gray"
                      {...field}
                      disabled={removeIsPeding}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </div>
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
              type="submit"
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
        </form>
      </Form.Root>
    </AlertDialog.Root>
  );
}
