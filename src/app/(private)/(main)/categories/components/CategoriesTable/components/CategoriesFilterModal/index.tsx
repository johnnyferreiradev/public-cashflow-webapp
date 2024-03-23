import { Button, Modal, Select } from 'nemea-ui';

import { Form } from '@/components/ui/Form';

import { cn } from '@/utils/cn';

import { CategoriesFilterModalProps } from './types';
import { useCategoriesFilterModal } from './hook';

export default function CategoriesFilterModal({
  className = '',
  id,
  open,
  initialFilters,
  onClose,
  onApply,
}: CategoriesFilterModalProps) {
  const {
    form,
    handleSave,
    typeSelectKey,
    setTypeSelectKey,
    subtypeSelectKey,
    setSubtypeSelectKey,
    handleClose,
  } = useCategoriesFilterModal(initialFilters, onApply, onClose);
  const { getValues, setValue, watch } = form;

  return (
    <Modal.Root
      open={open}
      className={cn(className)}
      contentClassName="w-full max-w-xl flex flex-col"
      id={id}
    >
      <Modal.Title>Filtrar categorias</Modal.Title>
      <div className="pt-4 w-full flex-1">
        <Form.Root {...form}>
          <form
            onSubmit={form.handleSubmit(handleSave)}
            className="w-full min-w-full md:!min-w-[384px] max-w-sm flex flex-col gap-5 mt-4 h-full"
          >
            <div className="w-full flex flex-col gap-5 flex-1">
              <div className="w-full max-w-full flex items-end gap-1">
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
                            <Select.Item value="inflow">Entrada</Select.Item>
                            <Select.Item value="outflow">Saída</Select.Item>
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
                      <Form.Label>Natureza da operação</Form.Label>
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
                            <Select.Item value="sale">Venda</Select.Item>
                            <Select.Item value="financial_application">
                              Aplicação financeira
                            </Select.Item>
                            <Select.Item value="investment">
                              Investimento
                            </Select.Item>
                            <Select.Item value="variable_cost">
                              Custo variável
                            </Select.Item>
                            <Select.Item value="fixed_cost">
                              Custo fixo
                            </Select.Item>
                            <Select.Item value="other">Outro</Select.Item>
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
