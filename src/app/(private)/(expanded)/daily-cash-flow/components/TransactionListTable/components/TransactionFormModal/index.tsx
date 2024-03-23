import { Alert, Button, Loader, Modal, Select, Tabs } from 'nemea-ui';
import {
  SmileySad,
  ArrowCounterClockwise,
  ArrowUp,
  ArrowDown,
  Plus,
} from '@phosphor-icons/react';

import { cn } from '@/utils/cn';

import { useTransactionForm } from './hook';

import { listTransactionCategories } from '@/services/cashflow/transactionCategory';

import LimitedInput from '@/components/ui/LimitedInput';
import LimitedTextarea from '@/components/ui/LimitedTextarea';
import CurrencyInput from '@/components/ui/CurrencyInput';
import FetchCombobox from '@/components/ui/FetchCombobox';
import { FetchComboboxFetchItemsAction } from '@/components/ui/FetchCombobox/types';
import TransactionFormLoading from './components/TransactionFormLoading';
import { Form } from '@/components/ui/Form';

import { TransactionFormModalProps } from './types';

export default function TransactionFormModal({
  className = '',
  id,
  name,
  open,
  onClose,
  onOpenCategoryForm,
  category,
}: TransactionFormModalProps) {
  const {
    form,
    save,
    show,
    categorySelectKey,
    subtypeSelectKey,
    handleTypeChange,
    handleClose,
  } = useTransactionForm({
    open,
    onClose,
    id,
    category,
  });

  return (
    <Modal.Root
      open={open}
      className={cn(className)}
      contentClassName="w-full min-w-full md:min-w-[512px] max-w-[512px] flex flex-col relative"
      id={id}
    >
      <Modal.CloseButton onClose={handleClose} disabled={save.isLoading} />
      {!show.isLoading && !show.isError && (
        <>
          <Modal.Title>
            {name ? 'Editar transação' : 'Nova transação'}
          </Modal.Title>
          {name && (
            <Modal.Description className="mt-1 w-11/12 pr-2 text-primary-500">
              {name}
            </Modal.Description>
          )}
          <Modal.Description className="mt-1 w-11/12 pr-2">
            Preencha o formulário abaixo para {name ? 'modificar' : 'inserir'}{' '}
            sua transação.
          </Modal.Description>

          {save.isError && (
            <Alert.Root className="mt-8" theme="failure">
              <Alert.Icon>
                <SmileySad />
              </Alert.Icon>
              <Alert.Content>
                <Alert.Title>Ops! Algo está errado.</Alert.Title>
                <Alert.Description>
                  Ocorreu um inesperado ao tentar salvar sua transação. Tente
                  novamente ou, se o problema persistir, contate o suporte.
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
          )}

          <div className="pt-4 w-full flex-1">
            <Form.Root {...form}>
              <form
                onSubmit={form.handleSubmit(save.handleSave)}
                className="flex flex-col gap-5 mt-4 h-full"
              >
                <div className="flex flex-col gap-5 flex-1">
                  <Form.Field
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <Form.Item>
                        <Form.Control>
                          <Tabs.Root
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleTypeChange();
                            }}
                            className="mt-1"
                          >
                            <Tabs.List theme="light" className="w-full">
                              <Tabs.Trigger
                                value="inflow"
                                className="w-full flex justify-center items-center gap-1"
                                disabled={save.isLoading || !!id}
                              >
                                <ArrowUp
                                  size={18}
                                  weight="bold"
                                  className="text-success-400"
                                />
                                <span>Entrada</span>
                              </Tabs.Trigger>
                              <Tabs.Trigger
                                value="outflow"
                                className="w-full flex justify-center items-center gap-1"
                                disabled={save.isLoading || !!id}
                              >
                                <ArrowDown
                                  size={18}
                                  weight="bold"
                                  className="text-failure-400"
                                />
                                <span>Saída</span>
                              </Tabs.Trigger>
                            </Tabs.List>
                          </Tabs.Root>
                        </Form.Control>
                        <Form.Message />
                      </Form.Item>
                    )}
                  />

                  <Form.Field
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <Form.Item>
                        <Form.Label>
                          Nome{' '}
                          <span className="text-failure-500 font-bold">*</span>
                        </Form.Label>
                        <Form.Control>
                          <LimitedInput
                            limit={50}
                            placeholder="Insira o título de seu transaction"
                            theme="gray"
                            {...field}
                            disabled={save.isLoading}
                          />
                        </Form.Control>
                        <Form.Message />
                      </Form.Item>
                    )}
                  />
                  <Form.Field
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <Form.Item>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control>
                          <LimitedTextarea
                            limit={100}
                            placeholder="Insira uma descrição para seu transaction"
                            theme="gray"
                            {...field}
                            disabled={save.isLoading}
                            rows={3}
                          />
                        </Form.Control>
                        <Form.Message />
                      </Form.Item>
                    )}
                  />
                  <Form.Field
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <Form.Item>
                        <Form.Label>
                          Valor{' '}
                          <span className="text-failure-500 font-bold">*</span>
                        </Form.Label>
                        <Form.Control>
                          <CurrencyInput
                            placeholder="R$ 0,00"
                            theme="gray"
                            allowNegative={false}
                            {...field}
                            disabled={save.isLoading || !!id}
                          />
                        </Form.Control>
                        <Form.Message />
                      </Form.Item>
                    )}
                  />

                  {!!open && (
                    <>
                      <Form.Field
                        control={form.control}
                        name="subtype"
                        render={({ field }) => (
                          <Form.Item>
                            <Form.Label>
                              Natureza da operação{' '}
                              <span className="text-failure-500 font-bold">
                                *
                              </span>
                            </Form.Label>
                            <Form.Control>
                              <Select.Root
                                onValueChange={field.onChange}
                                value={form.getValues('subtype')}
                                key={subtypeSelectKey}
                                disabled={save.isLoading || !!id}
                              >
                                <Select.Trigger
                                  id="category"
                                  className="w-full flex justify-between items-center"
                                >
                                  <Select.Value placeholder="Selecione..." />
                                </Select.Trigger>
                                <Select.Content className="z-40">
                                  {form.getValues('type') === 'inflow' && (
                                    <>
                                      <Select.Item value="sale">
                                        Venda
                                      </Select.Item>
                                    </>
                                  )}

                                  {form.getValues('type') === 'outflow' && (
                                    <>
                                      <Select.Item value="variable_cost">
                                        Custo Variável
                                      </Select.Item>
                                      <Select.Item value="fixed_cost">
                                        Custo Fixo
                                      </Select.Item>
                                    </>
                                  )}

                                  <Select.Item value="financial_application">
                                    Aplicação financeira
                                  </Select.Item>
                                  <Select.Item value="investment">
                                    Investimento
                                  </Select.Item>
                                  <Select.Item value="other">Outro</Select.Item>
                                </Select.Content>
                              </Select.Root>
                            </Form.Control>
                            <Form.Message />
                          </Form.Item>
                        )}
                      />

                      <Form.Field
                        control={form.control}
                        name="category"
                        render={() => (
                          <Form.Item>
                            <div className="w-full flex items-end justify-between">
                              <Form.Label>Categoria</Form.Label>
                              <Button.Root
                                size="xs"
                                theme="linkPrimary"
                                className="p-0.5"
                                onClick={() => onOpenCategoryForm()}
                                disabled={save.isLoading}
                              >
                                <Button.Icon>
                                  <Plus />
                                </Button.Icon>
                                <Button.Label>Nova</Button.Label>
                              </Button.Root>
                            </div>
                            <Form.Control>
                              <FetchCombobox
                                key={categorySelectKey}
                                defaultValue={form.getValues('category')}
                                defaultLabel={form.getValues('categoryName')}
                                onValueChange={(value, label) => {
                                  form.setValue('category', value || undefined);
                                  form.setValue(
                                    'categoryName',
                                    label || undefined,
                                  );
                                }}
                                fetchItems={
                                  listTransactionCategories as FetchComboboxFetchItemsAction
                                }
                                fetchKey="categories"
                                triggerClassName="w-full"
                                disabled={save.isLoading}
                              />
                            </Form.Control>
                            <Form.Message />
                          </Form.Item>
                        )}
                      />
                    </>
                  )}
                </div>
                <div className="flex justify-between items-center mt-8 mb-4 md:!mb-0">
                  <Modal.Close>
                    <Button.Root
                      theme="grayPrimary"
                      onClick={handleClose}
                      disabled={save.isLoading}
                    >
                      <Button.Label>Cancelar</Button.Label>
                    </Button.Root>
                  </Modal.Close>
                  <Button.Root theme="primary" disabled={save.isLoading}>
                    {save.isLoading && (
                      <Button.Icon className="relative -top-[2.5px]">
                        <Loader color="white" size="xs" className="m-0" />
                      </Button.Icon>
                    )}
                    <Button.Label>
                      {save.isLoading ? 'Salvando...' : 'Salvar'}
                    </Button.Label>
                  </Button.Root>
                </div>
              </form>
            </Form.Root>
          </div>
        </>
      )}

      {show.isLoading && <TransactionFormLoading />}

      {show.isError && (
        <Alert.Root className="mt-16 mb-12" theme="failure">
          <Alert.Icon>
            <SmileySad />
          </Alert.Icon>
          <Alert.Content>
            <Alert.Title>Ops! Algo está errado.</Alert.Title>
            <Alert.Description>
              Ocorreu um inesperado ao carregar os dados do sua transação. Tente
              novamente.
            </Alert.Description>
          </Alert.Content>
          <Alert.Actions className="flex items-center justify-center -translate-x-7">
            <Button.Root
              theme="failure"
              className="my-4"
              onClick={show.handleRefetch}
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
