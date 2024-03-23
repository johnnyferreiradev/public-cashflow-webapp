'use client';

import { Badge, Separator, Table } from 'nemea-ui';

import { cn } from '@/utils/cn';
import { getDateAndTimeInSlashFormat } from '@/utils/date';
import { formatCurrency } from '@/utils/currency';

import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import EmptyState from '@/components/ui/EmptyState';
import { LastTransactionsTableLoading } from './components/LastTransactionsTableLoading';

import { useLastTransactionsTable } from './hook';

import { LastTransactionsTableProps } from './types';

export default function LastTransactionsTable({
  className = '',
  id,
}: LastTransactionsTableProps) {
  const { data, isError, isLoading, refetch } = useLastTransactionsTable();

  return (
    <div className={cn('', className)} id={id}>
      {isLoading && <LastTransactionsTableLoading />}

      {isError && (
        <ClientErrorBoundary
          title="Ops! Aldo de errado aconteceu."
          subtitle="Tente novamente mais tarde ou contate o suporte."
          onRetry={refetch}
        />
      )}

      {!isError && !isLoading && (
        <>
          <div className="w-full">
            <h3 className="text-lg font-medium">
              Últimas transações realizadas
            </h3>
          </div>
          <Separator className="my-4" />
          {data && data.length > 0 && (
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.Head className="min-w-[200px]">Nome</Table.Head>
                  <Table.Head className="min-w-[200px]">Categoria</Table.Head>
                  <Table.Head className="min-w-[200px]">Valor</Table.Head>
                  <Table.Head className="min-w-[200px]">Criado em</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data?.map((transaction) => (
                  <Table.Row key={transaction.id}>
                    <Table.Cell className="max-w-xs">
                      {transaction.name}
                    </Table.Cell>
                    <Table.Cell className="max-w-xs">
                      {transaction.category.name}
                    </Table.Cell>
                    <Table.Cell>
                      <Badge theme="gray" className="px-0 justify-center">
                        <span
                          className={cn({
                            'text-success-400': transaction.type === 'inflow',
                            'text-failure-400': transaction.type === 'outflow',
                          })}
                        >
                          {formatCurrency(transaction.value)}
                        </span>
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      {getDateAndTimeInSlashFormat(transaction.created_at)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          )}
        </>
      )}

      {data?.length === 0 && (
        <EmptyState
          title="Ainda não há transações"
          subtitle="Crie uma nova transação e ela será exibida aqui"
        />
      )}
    </div>
  );
}
