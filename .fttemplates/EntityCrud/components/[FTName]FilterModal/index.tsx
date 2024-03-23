import { Button, Modal, Select } from 'nemea-ui';

import { Form } from '@/components/Form';

import { cn } from '@/utils/cn';

import { use[FTName]sFilterModal } from './hook';

import { [FTName]sFilterModalProps } from './types';

export default function [FTName]sFilterModal({
  className = '',
  id,
  open,
  initialFilters,
  onClose,
  onApply,
}: [FTName]sFilterModalProps) {
  const {
    form,
    handleSave,
    typeSelectKey,
    setTypeSelectKey,
    subtypeSelectKey,
    setSubtypeSelectKey,
    handleClose,
  } = use[FTName]sFilterModal(initialFilters, onApply, onClose);
  const { getValues, setValue, watch } = form;

  return (
    <Modal.Root
      open={open}
      className={cn(className)}
      contentClassName="w-full max-w-xl flex flex-col"
      id={id}
    >
      <Modal.Title>Filtrar <FTName | lowercase></Modal.Title>
      <div className="pt-4 w-full flex-1">
        <Form.Root {...form}>
          <form
            onSubmit={form.handleSubmit(handleSave)}
            className="flex flex-col gap-5 mt-4 h-full w-96"
          >
            <div className="flex flex-col gap-5 flex-1">
              <div className="flex items-end gap-1">
                <Form.Field
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <Form.Item className="flex-1">
                      <Form.Label>Tipo</Form.Label>
                      <Form.Control>
                        <Select.Root
                          value={getValues('type')}
                          onValueChange={field.onChange}
                          key={typeSelectKey}
                        >
                          <Select.Trigger
                            id="type"
                            className="w-full flex justify-between items-center"
                          >
                            <Select.Value placeholder="Selecione..." />
                          </Select.Trigger>
                          <Select.Content className="z-40">
                            <Select.Item value="type-1">Tipo 1</Select.Item>
                            <Select.Item value="type-2">Tipo 2</Select.Item>
                          </Select.Content>
                        </Select.Root>
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  )}
                />
                {!!watch('type') && (
                  <Button.Root
                    theme="primaryFlat"
                    onClick={() => {
                      setValue('type', undefined);
                      setTypeSelectKey((+new Date()).toString());
                    }}
                  >
                    <Button.Label>Limpar</Button.Label>
                  </Button.Root>
                )}
              </div>
              <div className="flex items-end gap-1">
                <Form.Field
                  control={form.control}
                  name="subtype"
                  render={({ field }) => (
                    <Form.Item className="flex-1">
                      <Form.Label>Subtipo</Form.Label>
                      <Form.Control>
                        <Select.Root
                          value={getValues('subtype')}
                          onValueChange={field.onChange}
                          key={subtypeSelectKey}
                        >
                          <Select.Trigger
                            id="subtype"
                            className="w-full flex justify-between items-center"
                          >
                            <Select.Value placeholder="Selecione..." />
                          </Select.Trigger>
                          <Select.Content className="z-40">
                            <Select.Item value="subtype-1">Subtipo 1</Select.Item>
                            <Select.Item value="subtype-2">Subtipo 2</Select.Item>
                          </Select.Content>
                        </Select.Root>
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  )}
                />
                {!!watch('subtype') && (
                  <Button.Root
                    theme="primaryFlat"
                    onClick={() => {
                      setValue('subtype', undefined);
                      setSubtypeSelectKey((+new Date()).toString());
                    }}
                  >
                    <Button.Label>Limpar</Button.Label>
                  </Button.Root>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-8 mb-4 md:!mb-0">
              <Button.Root
                theme="grayPrimary"
                type="button"
                onClick={() => {
                  setValue('type', undefined);
                  setValue('subtype', undefined);
                  setTypeSelectKey((+new Date()).toString());
                  setSubtypeSelectKey((+new Date()).toString());
                }}
              >
                <Button.Label>Limpar todos</Button.Label>
              </Button.Root>

              <Button.Root theme="primary" type="submit">
                <Button.Label>Aplicar</Button.Label>
              </Button.Root>
            </div>
          </form>
        </Form.Root>
      </div>
      <Modal.CloseButton onClose={handleClose} />
    </Modal.Root>
  );
}
