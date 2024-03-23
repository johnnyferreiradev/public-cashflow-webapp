'use client';

import { Badge, Separator } from 'nemea-ui';

import { formatCurrency } from '@/utils/currency';
import { getLongLocalizedDate } from '@/utils/date';

import Card from '@/components/ui/Card';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import LastCashFlowCardLoading from './components/LastCashFlowCardLoading';

import { useLastCashFlowCard } from './hook';

import { LastCashflowCardProps } from './types';

export default function LastCashflowCard({
  className = '',
  id,
}: LastCashflowCardProps) {
  const { balanceStatus, data, isError, isLoading, refetch, statusIcons } =
    useLastCashFlowCard();

  return (
    <Card className={className} id={id}>
      {isLoading && <LastCashFlowCardLoading />}

      {isError && (
        <ClientErrorBoundary
          title="Ops! Algo de errado aconteceu."
          subtitle="Tente novamente mais tarde ou contate o suporte."
          onRetry={refetch}
          className="[&_img]:max-w-[120px]"
        />
      )}

      {!data && !isLoading && !isError && (
        <>
          <div className="mb-8">
            <h3 className="text-lg font-medium">
              Resultado do fechamento anterior
            </h3>
          </div>
          <div className="w-full mb-4">
            <p className="text-gray-400 text-center">
              Ainda não há lançamentos
            </p>
          </div>
        </>
      )}

      {data && (
        <>
          <div className="mb-8">
            <h3 className="text-lg font-medium">
              Resultado do fechamento anterior
            </h3>
            <p className="text-base text-gray-400">
              {getLongLocalizedDate(new Date(data.date).getTime())}
            </p>
          </div>

          <div className="w-full mb-4">
            <p className="text-sm text-gray-400">Total em receita</p>
            <div className="w-full flex justify-between">
              <h3 className="text-lg font-medium">
                {formatCurrency(data.last_total_inflow)}
              </h3>
              <Badge theme="gray">{statusIcons.positive}</Badge>
            </div>
          </div>

          <div className="w-full mb-4">
            <p className="text-sm text-gray-400">Total em despesas</p>
            <div className="w-full flex justify-between">
              <h3 className="text-lg font-medium">
                {formatCurrency(data.last_total_outflow).replace('-', '')}
              </h3>
              <Badge theme="gray">{statusIcons.negative}</Badge>
            </div>
          </div>

          <Separator className="mb-4" />

          <div className="w-full">
            <p className="text-sm text-gray-400">Saldo do dia</p>
            <div className="w-full flex justify-between">
              <h3 className="text-lg font-medium">
                {formatCurrency(data.last_balance)}
              </h3>
              <Badge theme="gray">
                {statusIcons[balanceStatus as keyof typeof statusIcons]}
              </Badge>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
