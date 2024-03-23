import { ArrowCounterClockwise, SmileySad } from '@phosphor-icons/react';
import { Alert, Button, Loader, Modal } from 'nemea-ui';

import { cn } from '@/utils/cn';

import { useCategoryForm } from './hook';

import { Form } from '@/components/ui/Form';
import LimitedInput from '@/components/ui/LimitedInput';
import LimitedTextarea from '@/components/ui/LimitedTextarea';
import CategoryFormLoading from './components/CategoryFormLoading';

import { CategoryFormModalProps } from './types';

export default function CategoryFormModal({
  className = '',
  id,
  name,
  open,
  onClose,
}: CategoryFormModalProps) {
  const { form, save, show, handleClose } = useCategoryForm({
    open,
    onClose,
    id,
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
            {name ? 'Editar Categoria' : 'Nova Categoria'}
          </Modal.Title>
          {name && (
            <Modal.Description className="mt-1 w-11/12 pr-2 text-primary-500">
              {name}
            </Modal.Description>
          )}
          <Modal.Description className="mt-1 w-11/12 pr-2">
            Preencha o formulário abaixo para {name ? 'modificar' : 'inserir'}{' '}
            sua categoria.
          </Modal.Description>

          {save.isError && (
            <Alert.Root className="mt-8" theme="failure">
              <Alert.Icon>
                <SmileySad />
              </Alert.Icon>
              <Alert.Content>
                <Alert.Title>Ops! Algo está errado.</Alert.Title>
                <Alert.Description>
                  Ocorreu um inesperado ao tentar salvar sua categoria. Tente
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
                            placeholder="Insira o título da sua categoria"
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
                            placeholder="Insira uma descrição para sua categoria"
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

      {show.isLoading && <CategoryFormLoading />}

      {show.isError && (
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
