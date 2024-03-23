import { Alert, Button, Loader, Modal } from 'nemea-ui';
import { SmileySad, ArrowCounterClockwise } from '@phosphor-icons/react';

import { cn } from '@/utils/cn';

import { use[FTName]Form } from './hook';

import { Form } from '@/components/Form';
import LimitedInput from '@/components/LimitedInput';
import LimitedTextarea from '@/components/LimitedTextarea';
import [FTName]FormLoading from './components/[FTName]FormLoading';

import { [FTName]FormModalProps } from './types';

export default function [FTName]FormModal({
  className = '',
  id,
  name,
  open,
  onClose,
}: [FTName]FormModalProps) {
  const {
    form,
    handleSave,
    saveIsPeding,
    saveIsError,
    handleClose,
    showIsError,
    showIsLoading,
    handleRefetch,
  } = use[FTName]Form(onClose, id);

  return (
    <Modal.Root
      open={open}
      className={cn(className)}
      contentClassName="w-full min-w-full md:min-w-[512px] max-w-[512px] flex flex-col relative"
      id={id}
    >
      <Modal.CloseButton onClose={onClose} disabled={saveIsPeding} />
      {!showIsLoading && !showIsError && (
        <>
          <Modal.Title>
            {name ? 'Editar <FTName | lowercase>' : 'Novo <FTName | lowercase>'}
          </Modal.Title>
          {name && (
            <Modal.Description className="mt-1 w-11/12 pr-2 text-primary-500">
              {name}
            </Modal.Description>
          )}
          <Modal.Description className="mt-1 w-11/12 pr-2">
            Preencha o formulário abaixo para {name ? 'modificar' : 'inserir'}{' '}
            seu <FTName | lowercase>.
          </Modal.Description>


          {saveIsError && (
            <Alert.Root className="mt-8" theme="failure">
              <Alert.Icon>
                <SmileySad />
              </Alert.Icon>
              <Alert.Content>
                <Alert.Title>Ops! Algo está errado.</Alert.Title>
                <Alert.Description>
                  Ocorreu um inesperado ao tentar salvar seu <FTName | lowercase>. Tente
                  novamente ou, se o problema persistir, contate o suporte.
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
                            placeholder="Insira o título de seu <FTName | lowercase>"
                            theme="gray"
                            {...field}
                            disabled={saveIsPeding}
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
                        <Form.Label>
                          Descrição{' '}
                          <span className="text-failure-500 font-bold">*</span>
                        </Form.Label>
                        <Form.Control>
                          <LimitedTextarea
                            limit={100}
                            placeholder="Insira uma descrição para seu <FTName | lowercase>"
                            theme="gray"
                            {...field}
                            disabled={saveIsPeding}
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

      {showIsLoading && <[FTName]FormLoading />}

      {showIsError && (
        <Alert.Root className="mt-16 mb-12" theme="failure">
          <Alert.Icon>
            <SmileySad />
          </Alert.Icon>
          <Alert.Content>
            <Alert.Title>Ops! Algo está errado.</Alert.Title>
            <Alert.Description>
              Ocorreu um inesperado ao carregar os dados do seu <FTName | lowercase>. Tente
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
    </Modal.Root>
  );
}
