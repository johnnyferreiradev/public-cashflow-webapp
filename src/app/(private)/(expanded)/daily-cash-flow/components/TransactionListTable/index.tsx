'use client';

import { Badge, Button, Dropdown, Table, Tooltip } from 'nemea-ui';
import {
  ArrowDown,
  ArrowUp,
  CaretLeft,
  CaretRight,
  DotsThreeVertical,
  Eye,
  FunnelSimple,
  MagnifyingGlass,
  PencilSimple,
  Plus,
} from '@phosphor-icons/react';

import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/currency';
import { TransactionSubtypeChoices } from '@/utils/enums';

import { useTransactionsTable } from './hook';

import Card from '@/components/ui/Card';
import TransactionsTableLoading from './components/TransactionTableLoading';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import DebouncedInput from '@/components/ui/DebouncedInput';
import TransactionsFilterModal from './components/TransactionFilterModal';
import EmptyState from '@/components/ui/EmptyState';
import OrderingButton from '@/components/ui/OrderingButton';
import TransactionFormModal from './components/TransactionFormModal';
import TransactionDetailsModal from './components/TransactionDetailsModal';
import CategoryFormModal from '@/components/modules/cashflow/CategoryFormModal';
import PaginationControl from '@/components/ui/PaginationControl';

import { TransactionListTableProps } from './types';

export default function TransactionListTable({
  className = '',
  id,
  isToday,
}: TransactionListTableProps) {
  const {
    transaction,
    category,
    data,
    isError,
    isLoading,
    handleRefetch,
    getOrderingValue,
    actions: {
      category: categoryModal,
      details: detailsModal,
      filter: filterModal,
      form: formModal,
    },
    filters,
  } = useTransactionsTable();

  if (isLoading) {
    return <TransactionsTableLoading />;
  }

  if (isError) {
    return (
      <Card className="w-full mt-4 md:!mt-8">
        <ClientErrorBoundary
          title="Ops! Algo de errado aconteceu."
          subtitle="Tente novamente mais tarde ou contate o suporte."
          onRetry={handleRefetch}
        />
      </Card>
    );
  }

  return (
    <Card className={cn(className)} id={id}>
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <DebouncedInput
            placeholder="Busque por nome"
            icon={
              <MagnifyingGlass className="text-primary-500" weight="bold" />
            }
            theme="gray"
            size="sm"
            className="w-full max-w-xs"
            initialValue={filters.search}
            onChange={filters.onChangeSearch}
            autoFocus={filters.search !== ''}
          />
          <Button.Root
            size="sm"
            className="w-10"
            theme="grayPrimary"
            onClick={() => filterModal.handleOpen()}
          >
            {filters.totalFilters > 0 && (
              <Button.Badge>{filters.totalFilters}</Button.Badge>
            )}
            <Button.Label>
              <FunnelSimple size={18} weight="bold" />
            </Button.Label>
          </Button.Root>
        </div>

        {isToday && (
          <Button.Root
            theme="grayPrimary"
            size="sm"
            onClick={() => formModal.handleOpen()}
            className="ml-3 min-w-[40px] min-h-[36px]"
          >
            <Button.Icon>
              <Plus weight="bold" />
            </Button.Icon>
            <Button.Label className="hidden md:!block">
              Nova transação
            </Button.Label>
          </Button.Root>
        )}

        <TransactionFormModal
          id={transaction.id}
          name={transaction.name}
          open={formModal.isOpen}
          onClose={formModal.handleClose}
          onOpenCategoryForm={categoryModal.handleOpen}
          category={category}
        />

        <CategoryFormModal
          open={categoryModal.isOpen}
          onClose={categoryModal.handleClose}
          className="z-50"
        />

        {transaction.id && transaction.name && (
          <TransactionDetailsModal
            id={transaction.id}
            name={transaction.name}
            open={detailsModal.isOpen}
            onClose={() => detailsModal.handleClose()}
          />
        )}

        <TransactionsFilterModal
          open={filterModal.isOpen}
          onClose={() => filterModal.handleClose()}
          onApply={(newFilters) => {
            filters.onChangeFilters(newFilters);
          }}
          initialFilters={filters}
        />
      </header>

      {!!data && data.results.length > 0 && (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head className="w-16">Tipo</Table.Head>
              <Table.Head className="flex items-center gap-1 min-w-[200px]">
                <p>Nome</p>
                <OrderingButton
                  fieldName="name"
                  value={getOrderingValue('name')}
                  onClick={filters.onChangeOrdering}
                />
              </Table.Head>
              <Table.Head className="min-w-[200px]">
                Natureza da operação
              </Table.Head>
              <Table.Head className="flex items-center gap-1 min-w-[200px]">
                <p>Valor</p>
                <OrderingButton
                  fieldName="value"
                  value={getOrderingValue('value')}
                  onClick={filters.onChangeOrdering}
                />
              </Table.Head>
              <Table.Head className="min-w-[200px]">Categoria</Table.Head>
              <Table.Head className="w-16">Ações</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.results.map((transaction, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <Tooltip.Root>
                    <Tooltip.Trigger>
                      <div className="flex items-center gap-1">
                        <Badge theme="gray" className="px-0 justify-center">
                          {transaction.type === 'inflow' ? (
                            <ArrowUp
                              size={18}
                              weight="bold"
                              className="text-success-400"
                            />
                          ) : (
                            <ArrowDown
                              size={18}
                              weight="bold"
                              className="text-failure-400"
                            />
                          )}
                        </Badge>
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content side="right">
                      <Tooltip.Arrow />
                      <p className="px-2 py-1">
                        {transaction.type === 'inflow' ? 'Entrada' : 'Saída'}
                      </p>
                    </Tooltip.Content>
                  </Tooltip.Root>
                </Table.Cell>
                <Table.Cell className="max-w-xs">{transaction.name}</Table.Cell>
                <Table.Cell>
                  {TransactionSubtypeChoices[transaction.subtype]}
                </Table.Cell>
                <Table.Cell>
                  <Badge theme="gray" className="px-1 justify-center z-10">
                    <span
                      className={
                        transaction.type === 'inflow'
                          ? 'text-success-400'
                          : 'text-failure-400'
                      }
                    >
                      {transaction.type === 'inflow' ? '+' : '-'}
                      {formatCurrency(transaction.value)}
                    </span>
                  </Badge>
                </Table.Cell>
                <Table.Cell>{transaction.category.name || '-'}</Table.Cell>
                <Table.Cell>
                  <Dropdown.Root
                    trigger={
                      <Button.Root
                        className="w-8 p-1 !outline-none ml-2"
                        theme="grayPrimary"
                      >
                        <Button.Label>
                          <DotsThreeVertical weight="bold" size={18} />
                        </Button.Label>
                      </Button.Root>
                    }
                    triggerAsChild
                    className="z-30"
                  >
                    <Dropdown.Item
                      className="flex items-center gap-1"
                      onClick={() =>
                        detailsModal.handleOpen(
                          transaction.id,
                          transaction.name,
                        )
                      }
                    >
                      <Eye /> <span>Ver detalhes</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="flex items-center gap-1"
                      onClick={() =>
                        formModal.handleOpen(transaction.id, transaction.name)
                      }
                    >
                      <PencilSimple /> <span>Editar</span>
                    </Dropdown.Item>
                  </Dropdown.Root>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}

      {data?.results.length !== 0 && filters.pageCount > 1 && (
        <div className="w-full flex justify-center">
          <PaginationControl
            pageCount={filters.pageCount}
            page={filters.page}
            onPageChange={(newPage) => filters.onChangePage(newPage)}
            previousLabel={<CaretLeft />}
            nextLabel={<CaretRight />}
            className="mt-6 mb-3"
          />
        </div>
      )}

      {data?.results.length === 0 && (
        <EmptyState
          title="Nenhuma transação encontrado"
          subtitle="Altere o campo de busca ou adicione uma nova."
          addNewLabel="Nova transação"
          onAddNew={isToday ? () => formModal.handleOpen() : undefined}
        />
      )}
    </Card>
  );
}
