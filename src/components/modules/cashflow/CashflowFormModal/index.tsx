import { ArrowCounterClockwise, Info, SmileySad } from '@phosphor-icons/react';
import { Alert, Button, Loader, Modal, Popover, Switch } from 'nemea-ui';

import { cn } from '@/utils/cn';

import { Form } from '@/components/ui/Form';
import CurrencyInput from '@/components/ui/CurrencyInput';
import LimitedInput from '@/components/ui/LimitedInput';
import CashFlowFormLoading from './components/CashFlowFormLoading';

import { useCashFlowForm } from './hook';

import { CashFlowFormModalProps } from './types';

export default function CashflowFormModal({
  className = '',
  id,
  open,
  onClose,
  defaultActive = false,
  onSave,
}: CashFlowFormModalProps) {
  const {
    form,
    handleSave,
    handleClose,
    handleRefetch,
    saveIsError,
    saveIsPeding,
    showIsError,
    showIsLoading,
  } = useCashFlowForm({ open, onClose, id, defaultActive, onSave });

  return (
    <Modal.Root
      open={open}
      className={cn(className)}
      contentClassName="w-full min-w-full md:min-w-[512px] max-w-[512px] flex flex-col relative"
      id={id}
    >
      <Modal.CloseButton onClose={handleClose} disabled={saveIsPeding} />
      {!showIsLoading && !showIsError && (
        <>
          <Modal.Title>{!!id ? 'Editar' : 'Novo'} caixa</Modal.Title>
          <Modal.Description className="mt-1 w-11/12 pr-2">
            {!!id
              ? 'Altere a descrição do seu caixa'
              : 'Escolha sua abordagem financeira: comece do zero ou com um valor inicial em caixa.'}
          </Modal.Description>

          {saveIsError && (
            <Alert.Root className="mt-8" theme="failure">
              <Alert.Icon>
                <SmileySad />
              </Alert.Icon>
              <Alert.Content>
                <Alert.Title>Ops! Algo está errado.</Alert.Title>
                <Alert.Description>
                  Ocorreu um inesperado ao tentar criar seu caixa.
                  Tente novamente ou, se o problema persistir, contate o
                  suporte.
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
          )}

          <div className="pt-4 w-full flex-1">
            <Form.Root {...form}>
              <form
                onSubmit={form.handleSubmit(handleSave)}
                className="flex flex-col gap-5 mt-4 h-full"
              >
                <div className="flex flex-col gap-5 flex-1">
                  <Form.Field
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <Form.Item>
                        <Form.Label>
                          Descrição{' '}
                          <span className="text-failure-500 font-bold">*</span>
                        </Form.Label>
                        <Form.Control>
                          <LimitedInput
                            placeholder="Insira uma descrição para seu caixa"
                            theme="gray"
                            limit={100}
                            {...field}
                          />
                        </Form.Control>
                        <Form.Message />
                      </Form.Item>
                    )}
                  />
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
                            disabled={!!id}
                          />
                        </Form.Control>
                        <Form.Message />
                      </Form.Item>
                    )}
                  />
                  {!defaultActive && (
                    <Form.Field
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <Form.Item>
                          <div className="flex items-center gap-2">
                            <Form.Control>
                              <Switch
                                checked={field.value}
                                onCheckedChange={(checked) =>
                                  form.setValue('isActive', checked)
                                }
                                disabled={!!id}
                              />
                            </Form.Control>
                            <Form.Label className="text-base !mt-0 cursor-pointer">
                              Definir este caixa como ativo
                            </Form.Label>

                            <Popover.Root>
                              <Popover.Trigger>
                                <div className="bg-primary-500 rounded-full p-1">
                                  <Info className="text-light" weight="bold" />
                                </div>
                              </Popover.Trigger>
                              <Popover.Content className="p-2 w-full max-w-xs text-grayscale-400 dark:text-grayscale-50">
                                Ao ativar esta opção, este se tornará o seu
                                caixa principal. Os dados e
                                estatísticas apresentados no dashboard serão
                                calculados com base em suas transações.
                              </Popover.Content>
                            </Popover.Root>
                          </div>
                          <Form.Message />
                        </Form.Item>
                      )}
                    />
                  )}
                </div>
                <div className="flex justify-between items-center mt-8 mb-4 md:!mb-0">
                  <Modal.Close>
                    <Button.Root
                      theme="grayPrimary"
                      onClick={handleClose}
                      disabled={saveIsPeding}
                    >
                      <Button.Label>Cancelar</Button.Label>
                    </Button.Root>
                  </Modal.Close>
                  <Button.Root theme="primary" disabled={saveIsPeding}>
                    {saveIsPeding && (
                      <Button.Icon className="relative -top-[2.5px]">
                        <Loader color="white" size="xs" className="m-0" />
                      </Button.Icon>
                    )}
                    <Button.Label>
                      {saveIsPeding ? 'Salvando...' : 'Salvar'}
                    </Button.Label>
                  </Button.Root>
                </div>
              </form>
            </Form.Root>
          </div>
        </>
      )}

      {showIsLoading && <CashFlowFormLoading />}

      {showIsError && (
        <Alert.Root className="mt-16 mb-12" theme="failure">
          <Alert.Icon>
            <SmileySad />
          </Alert.Icon>
          <Alert.Content>
            <Alert.Title>Ops! Algo está errado.</Alert.Title>
            <Alert.Description>
              Ocorreu um inesperado ao carregar os dados do caixa.
              Tente novamente.
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
    </Modal.Root>
  );
}
