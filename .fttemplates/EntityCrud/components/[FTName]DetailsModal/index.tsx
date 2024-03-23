import { Alert, Badge, Button, Modal, Separator } from 'nemea-ui';
import {
  SmileySad,
  ArrowCounterClockwise,
  ArrowUp,
  UserCircle,
  Calendar,
  ArrowDown,
} from '@phosphor-icons/react';

import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/currency';
import { getDateAndTimeInSlashFormat } from '@/utils/date';

import { use[FTName]Form } from './hook';

import [FTName]DetailsLoading from './components/[FTName]DetailsLoading';

import { [FTName]DetailsProps } from './types';

export default function [FTName]Details({
  className = '',
  id,
  name,
  open,
  onClose,
}: [FTName]DetailsProps) {
  const { data, showIsError, showIsLoading, handleRefetch } =
    use[FTName]Form(id);

  return (
    <Modal.Root
      open={open}
      className={cn(className)}
      contentClassName="w-full min-w-full md:min-w-[712px] max-w-[712px] flex flex-col relative"
      id={id}
    >
      <Modal.CloseButton onClose={onClose} />
      {!showIsLoading && !showIsError && (
        <Modal.Title className="mb-2">{name}</Modal.Title>
      )}

      {!showIsLoading && !showIsError && (
        <div className="pb-6">
          <div className="w-full flex items-stretch justify-between gap-4 mt-8 mb-8">
            <div className="flex-1 rounded-md border border-grayscale-100 dark:border-grayscale-800 p-2">
              <p className="text-sm text-grayscale-400">Label 1</p>
              <div className="flex items-center gap-2">
                <h3 className="text-md font-medium">
                  Info. 1
                </h3>
              </div>
            </div>
            <div className="flex-1 rounded-md border border-grayscale-100 dark:border-grayscale-800 p-2">
              <p className="text-sm text-grayscale-400">Label 2</p>
              <h3 className="text-md font-medium">
                Info. 2
              </h3>
            </div>
            <div className="flex-1 rounded-md border border-grayscale-100 dark:border-grayscale-800 p-2">
            <p className="text-sm text-grayscale-400">Label 3</p>
              <h3 className="text-md font-medium">
                Info. 3
              </h3>
            </div>
          </div>

          <div className="w-full mt-4">
            <p className="text-sm text-grayscale-400">Descrição</p>
            <h3 className="text-md font-medium">{data.description}</h3>
          </div>

          <Separator className="my-8" />

          <div className="w-full">
            <h3 className="font-semibold mb-2">Criação</h3>
            <div className="w-full flex items-center gap-2">
              <div className="flex-1">
                <p className="text-sm text-grayscale-400 mb-1">Criado em:</p>
                <div className="flex items-center gap-1">
                  <Calendar size={24} className="text-grayscale-400" />
                  <h3 className="font-medium">
                    {getDateAndTimeInSlashFormat(data.created_at)}
                  </h3>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-grayscale-400 mb-1">Criado por:</p>
                <div className="flex items-center gap-1">
                  <UserCircle size={24} className="text-grayscale-400" />
                  <h3 className="font-medium">{data.created_by}</h3>
                </div>
              </div>
            </div>
          </div>

          {data.updated_by && (
            <>
              <Separator className="my-6" />

              <div className="w-full">
                <h3 className="font-semibold mb-2">Última atualização</h3>
                <div className="w-full flex items-center gap-2">
                  <div className="flex-1">
                    <p className="text-sm text-grayscale-400 mb-1">
                      Atualizado em:
                    </p>
                    <div className="flex items-center gap-1">
                      <Calendar size={24} className="text-grayscale-400" />
                      <h3 className="font-medium">
                        {getDateAndTimeInSlashFormat(data.updated_at)}
                      </h3>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-grayscale-400 mb-1">
                      Atualizado por:
                    </p>
                    <div className="flex items-center gap-1">
                      <UserCircle size={24} className="text-grayscale-400" />
                      <h3 className="font-medium">{data.updated_by}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {showIsLoading && <[FTName]DetailsLoading />}

      {showIsError && (
        <Alert.Root className="mt-16 mb-12" theme="failure">
          <Alert.Icon>
            <SmileySad />
          </Alert.Icon>
          <Alert.Content>
            <Alert.Title>Ops! Algo está errado.</Alert.Title>
            <Alert.Description>
              Ocorreu um inesperado ao carregar os dados do seu <FTName | lowercase>.
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
