'use client';

import { Badge, Button, Separator } from 'nemea-ui';
import { Pause, Play } from '@phosphor-icons/react';
import Link from 'next/link';

import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/currency';

import Card from '@/components/ui/Card';
import CurrentCashFlowCardLoading from './components/CurrentCashFlowCardLoading';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';

import { useCurrentCashFlowCard } from './hook';

import { CurrentCashflowCardProps } from './types';

export default function CurrentCashflowCard({
  className = '',
  id,
  description,
  status,
  hideDate = false,
}: CurrentCashflowCardProps) {
  const {
    currentDateLabel,
    statusIcons,
    data,
    isError,
    isLoading,
    refetch,
    balanceStatus,
    type,
    onClose,
    onContinue,
    onOpen,
    onReOpen,
    buttonLoading,
  } = useCurrentCashFlowCard();

  return (
    <Card className={className} id={id}>
      {isLoading && <CurrentCashFlowCardLoading />}

      {isError && (
        <ClientErrorBoundary
          title="Ops! Algo de errado aconteceu."
          subtitle="Tente novamente mais tarde ou contate o suporte."
          onRetry={refetch}
          className="[&_img]:max-w-[120px]"
        />
      )}

      {!isError && !isLoading && (
        <>
          {description && (
            <p className="text-base text-gray-400">{description}</p>
          )}
          {!hideDate && (
            <h3 className="font-bold text-2xl">{currentDateLabel}</h3>
          )}

          {data && (
            <div className="my-4 md:!my-8 flex md:!block flex-wrap gap-2">
              <div className="w-full mb-4 flex-1">
                <p className="text-sm text-gray-400">Total em receita</p>
                <div className="w-full flex justify-end md:!justify-between gap-2 flex-row-reverse md:!flex-row">
                  <h3 className="text-lg font-medium">
                    {formatCurrency(data.total_inflow)}
                  </h3>
                  <Badge theme="gray">{statusIcons.positive}</Badge>
                </div>
              </div>

              <div className="w-full mb-4 flex-1">
                <p className="text-sm text-gray-400">Total em despesas</p>
                <div className="w-full flex justify-end md:!justify-between gap-2 flex-row-reverse md:!flex-row">
                  <h3 className="text-lg font-medium">
                    {formatCurrency(data.total_outflow).replace('-', '')}
                  </h3>
                  <Badge theme="gray">{statusIcons.negative}</Badge>
                </div>
              </div>

              <Separator className="mb-4 hidden md:!block" />

              <div className="w-full mb-0 md:!mb-8 flex-1">
                <p className="text-sm text-gray-400">Saldo do dia</p>
                <div className="w-full flex justify-end md:!justify-between gap-2 flex-row-reverse md:!flex-row">
                  <h3 className="text-lg font-medium">
                    {formatCurrency(data.balance)}
                  </h3>
                  <Badge theme="gray">
                    {statusIcons[balanceStatus as keyof typeof statusIcons]}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {status === 'closed' && type === 'open' && (
            <Button.Root
              theme="primary"
              className={cn('w-full mt-4', {
                hidden: buttonLoading,
              })}
              asChild
              onClick={onOpen}
            >
              <Link href="/daily-cash-flow">
                <Button.Icon>
                  <Play />
                </Button.Icon>
                <Button.Label>Abrir caixa</Button.Label>
              </Link>
            </Button.Root>
          )}

          {status === 'closed' && type === 'continue' && (
            <>
              <p className="text-base text-gray-400">
                Seu caixa está fechado. Deseja reabrir?
              </p>
              <Button.Root
                theme="primary"
                className={cn('w-full mt-2', {
                  hidden: buttonLoading,
                })}
                asChild
                onClick={onReOpen}
              >
                <Link href="/daily-cash-flow">
                  <Button.Icon>
                    <Play />
                  </Button.Icon>
                  <Button.Label>Reabir caixa</Button.Label>
                </Link>
              </Button.Root>
            </>
          )}

          {((status === 'opened' && type === 'continue') ||
            (status === 'closed' && type === 'stop')) && (
            <Button.Root
              theme="primary"
              className={cn('w-full', {
                hidden: buttonLoading,
              })}
              asChild
              onClick={onContinue}
            >
              <Link href="/daily-cash-flow">
                <Button.Icon>
                  <Play />
                </Button.Icon>
                <Button.Label>Continuar</Button.Label>
              </Link>
            </Button.Root>
          )}

          {status === 'opened' && (type === 'stop' || type === 'open') && (
            <>
              <p className="text-base text-gray-400">
                Finalizou sua operação do dia? Feche seu caixa.
              </p>
              <Button.Root
                theme="grayPrimary"
                className={cn('w-full mt-2', {
                  hidden: buttonLoading,
                })}
                asChild
                onClick={onClose}
              >
                <Link href="/dashboard">
                  <Button.Icon>
                    <Pause />
                  </Button.Icon>
                  <Button.Label>Fechar caixa</Button.Label>
                </Link>
              </Button.Root>
            </>
          )}

          {buttonLoading && status === 'opened' && (
            <Button.Root theme="grayPrimary" className={cn('w-full')} disabled>
              <Button.Icon>
                <Pause />
              </Button.Icon>
              <Button.Label>Fechando caixa...</Button.Label>
            </Button.Root>
          )}

          {buttonLoading && status === 'closed' && (
            <Button.Root theme="primary" className={cn('w-full')} disabled>
              <Button.Icon>
                <Play />
              </Button.Icon>
              <Button.Label>Abrindo caixa...</Button.Label>
            </Button.Root>
          )}
        </>
      )}
    </Card>
  );
}
