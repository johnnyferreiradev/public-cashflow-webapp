'use client';

import {
  ArrowDown,
  ArrowUp,
  DotsThreeVertical,
  Play,
  Power,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { Badge, Button, Image } from 'nemea-ui';

import { cn } from '@/utils/cn';
import { getDateInSlashFormat } from '@/utils/date';
import { formatCurrency } from '@/utils/currency';

import { useCurrentCashFlowBanner } from './hooks';

import Card from '@/components/ui/Card';
import CurrentCashFlowBannerLoading from './components/CurrentCashFlowBannerLoading';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';

import investmentDataIllustration from '@/assets/images/investment-data.svg';
import coffeeTimeIllustration from '@/assets/images/coffee-time.svg';

import { CurrentCashflowBannerProps } from './types';

export default function CurrentCashflowBanner({
  className = '',
  id,
}: CurrentCashflowBannerProps) {
  const {
    data,
    showIsLoading,
    showIsError,
    handleRefetch,
    balanceBegde,
    continueOnClick,
    continueCardLabels,
    openIsLoading,
  } = useCurrentCashFlowBanner();

  if (showIsLoading) return <CurrentCashFlowBannerLoading />;

  return (
    <Card
      className={cn(
        'flex justify-between items-center flex-col lg:!flex-row rounded-lg',
        'p-4 md:!p-8 gap-4',
        className,
      )}
      id={id}
    >
      {showIsError && (
        <ClientErrorBoundary
          title="Ops! Algo de errado aconteceu."
          subtitle="Tente novamente mais tarde ou contate o suporte."
          hideImage
          className="w-full"
          onRetry={handleRefetch}
        />
      )}
      {!showIsError && data && (
        <>
          <div className="w-full flex-1 flex items-center justify-between flex-col md:!flex-row flex-wrap gap-16 mb-8 lg:!mb-0">
            <div className="flex flex-row flex-wrap md:!flex-col w-full">
              <div className="flex flex-row items-center gap-4">
                <Image
                  src={coffeeTimeIllustration.src}
                  alt="Coffee time"
                  className="w-20 mb-2 rounded-full bg-primary-400"
                />
                <div>
                  <h3 className="text-2xl font-bold w-full max-w-[400px]">
                    Este é o seu caixa atual
                  </h3>
                  <p className="text-sm text-primary-300">
                    Criado em: {getDateInSlashFormat(data.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-lg text-gray-400 w-full max-w-[424px] mt-4 break-words hyphens-auto">
                {data.description}
              </p>
            </div>

            <div
              className={cn(
                'w-full max-w-4xl flex sm:!grid flex-wrap gap-6',
                'sm:grid-cols-2 sm:grid-rows-2',
                '2xl:grid-cols-4 2xl:grid-rows-1',
              )}
            >
              <div className="w-max">
                <p className="text-sm text-gray-400 mb-1">Saldo inicial</p>
                <div className="w-full flex gap-2">
                  <Badge theme="gray" className="max-h-6">
                    <Play
                      size={18}
                      weight="bold"
                      className="text-primary-400"
                    />
                  </Badge>
                  <h3 className="text-sm md:!text-lg font-medium">
                    {formatCurrency(data.openingBalance)}
                  </h3>
                </div>
              </div>

              <div className="w-max">
                <p className="text-sm text-gray-400 mb-1">Total em receita</p>
                <div className="w-full flex gap-2">
                  <Badge theme="gray" className="max-h-6">
                    <ArrowUp
                      size={18}
                      weight="bold"
                      className="text-success-400"
                    />
                  </Badge>
                  <h3 className="text-sm md:!text-lg font-medium max-w-[180px] overflow-x-auto default-scroll">
                    {formatCurrency(data.totalInflow)}
                  </h3>
                </div>
              </div>

              <div className="w-max">
                <p className="text-sm text-gray-400 mb-1">Total em despesas</p>
                <div className="w-full flex gap-2">
                  <Badge theme="gray" className="max-h-6">
                    <ArrowDown
                      size={18}
                      weight="bold"
                      className="text-failure-400"
                    />
                  </Badge>
                  <h3 className="text-sm md:!text-lg font-medium max-w-[180px] overflow-x-auto default-scroll">
                    {formatCurrency(data.totalOutflow)}
                  </h3>
                </div>
              </div>

              <div className="w-max">
                <p className="text-sm text-gray-400 mb-1">Saldo atual</p>
                <div className="w-full flex gap-2">
                  <Badge theme="gray" className="max-h-6">
                    {balanceBegde}
                  </Badge>
                  <h3 className="text-sm md:!text-lg font-medium max-w-[180px] overflow-x-auto default-scroll">
                    {formatCurrency(data.balance)}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div
            className={cn(
              'w-full lg:!w-max h-full bg-primary-400 rounded-lg p-4 flex flex-col items-center justify-evenly',
            )}
          >
            <Image
              src={investmentDataIllustration.src}
              alt="Investment data"
              className="w-32 mb-6"
            />
            <div>
              <p className="text-base text-light mb-2 text-center">
                {continueCardLabels.labelText}
              </p>
              {!openIsLoading ? (
                <Button.Root
                  theme="primary"
                  className="w-full"
                  asChild
                  onClick={continueOnClick}
                >
                  <Link href="/daily-cash-flow">
                    <Button.Icon>
                      <Play />
                    </Button.Icon>
                    <Button.Label>{continueCardLabels.buttonText}</Button.Label>
                  </Link>
                </Button.Root>
              ) : (
                <Button.Root theme="primary" className="w-full" disabled>
                  <Button.Icon>
                    <Play />
                  </Button.Icon>
                  <Button.Label>Abrindo caixa...</Button.Label>
                </Button.Root>
              )}
            </div>
          </div>
        </>
      )}

      {!showIsError && !data && (
        <div className="w-full flex flex-col md:!flex-row items-center justify-between gap-2">
          <div className="flex flex-col items-center md:!items-start">
            <Image
              src={coffeeTimeIllustration.src}
              alt="Coffee time"
              className="w-28 mb-2 rounded-full bg-primary-400"
            />
            <h3 className="text-2xl font-bold w-full max-w-[460px] text-center md:!text-start">
              Parece que você ainda não tem um caixa ativo...
            </h3>
          </div>
          <div className="w-full md:!w-max flex justify-end items-end flex-col">
            <p className="text-xl w-full max-w-[320px] mt-4 text-center md:!text-end font-semibold">
              Que tal ativarmos um agora mesmo? Ou se preferir, crie um
              totalmente novo!
            </p>
            <p className="text-md text-gray-400 w-full max-w-[360px] mt-4 text-center md:!text-end">
              Para ativar um caixa existente, clique em{' '}
              <DotsThreeVertical
                weight="bold"
                className={cn(
                  'text-primary-600 dark:text-primary-400 bg-grayscale-50 dark:bg-grayscale-800 rounded-md h-6 w-6',
                  'text-xs inline-block p-0.5',
                )}
              />{' '}
              em um item da lista e logo após clique em{' '}
              <div className="inline-block relative top-0.5">
                <span className="text-primary-600 dark:text-primary-400 flex items-center gap-0.5">
                  <Power /> <p>Ativar</p>
                </span>
              </div>
              .
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
