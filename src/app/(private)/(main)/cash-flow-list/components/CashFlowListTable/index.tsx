'use client';

import { Button, Dropdown, Table } from 'nemea-ui';
import {
  CaretLeft,
  CaretRight,
  DotsThreeVertical,
  MagnifyingGlass,
  PencilSimple,
  Plus,
  Power,
  SealCheck,
  Trash,
  XCircle,
} from '@phosphor-icons/react';

import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/currency';
import { getMonthAndYearFromAPIDate, getYearFromAPIDate } from '@/utils/date';

import { useCashFlowsTable } from './hook';

import Card from '@/components/ui/Card';
import CashFlowsTableLoading from './components/CashFlowsTableLoading';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import DebouncedInput from '@/components/ui/DebouncedInput';
import CashFlowRemoveConfirm from './components/CashFlowRemoveConfirm';
import PaginationControl from '@/components/ui/PaginationControl';
import EmptyState from '@/components/ui/EmptyState';
import OrderingButton from '@/components/ui/OrderingButton';
import CashflowFormModal from '@/components/modules/cashflow/CashflowFormModal';
import CashFlowActiveConfirm from './components/CashFlowActiveConfirm';

import { CashFlowListTableProps } from './types';

export default function CashFlowListTable({
  className = '',
  id,
}: CashFlowListTableProps) {
  const {
    data,
    isError,
    isPending,
    search,
    handleChangeSearch,
    ordering,
    handleChangeOrdering,
    id: cashFlowId,
    description: cashFlowDescription,
    openingBalance: cashFlowOpeningBalance,
    year: cashFlowYear,
    handleRefetch,
    page,
    handleChangePage,
    pageCount,
    formModalIsOpen,
    handleOpenFormModal,
    handleFormClose,
    removeConfirmIsOpen,
    handleOpenRemoveConfirm,
    handleRemoveClose,
    activeConfirmIsOpen,
    handleOpenActiveConfirm,
    handleActiveConfirmClose,
  } = useCashFlowsTable();

  if (isPending) {
    return <CashFlowsTableLoading />;
  }

  if (isError) {
    return (
      <Card className="w-full mt-4 md:!mt-8">
        <ClientErrorBoundary
          title="Ops! Aldo de errado aconteceu."
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
            placeholder="Busque por descrição"
            icon={
              <MagnifyingGlass className="text-primary-500" weight="bold" />
            }
            theme="gray"
            size="sm"
            className="w-full max-w-xs"
            initialValue={search}
            onChange={handleChangeSearch}
            autoFocus={search !== ''}
          />
        </div>

        <Button.Root
          theme="grayPrimary"
          size="sm"
          onClick={() => handleOpenFormModal()}
          className="ml-3 min-w-[40px] min-h-[36px]"
        >
          <Button.Icon>
            <Plus weight="bold" />
          </Button.Icon>
          <Button.Label className="hidden md:!block">Novo caixa</Button.Label>
        </Button.Root>

        <CashflowFormModal
          id={cashFlowId}
          description={cashFlowDescription}
          open={formModalIsOpen}
          onClose={() => handleFormClose()}
          defaultActive={data.results.length === 0}
        />

        {cashFlowId && cashFlowOpeningBalance && cashFlowYear && (
          <CashFlowRemoveConfirm
            id={cashFlowId}
            openingBalance={cashFlowOpeningBalance}
            year={cashFlowYear}
            open={removeConfirmIsOpen}
            onClose={handleRemoveClose}
          />
        )}

        {cashFlowId && (
          <CashFlowActiveConfirm
            id={cashFlowId}
            onClose={handleActiveConfirmClose}
            open={activeConfirmIsOpen}
          />
        )}
      </header>

      {data.results.length > 0 && (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head className="min-w-[200px]">
                <p>Descrição</p>
              </Table.Head>
              <Table.Head className="min-w-[200px]">Saldo inicial</Table.Head>
              <Table.Head className="min-w-[200px] flex items-center gap-1">
                <p>Início da operação</p>
                <OrderingButton
                  fieldName="created_at"
                  value={ordering}
                  onClick={handleChangeOrdering}
                />
              </Table.Head>
              <Table.Head className="min-w-[200px]">Ativo</Table.Head>
              <Table.Head className="w-16">Ações</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.results.map((cashFlow, index) => (
              <Table.Row key={index}>
                <Table.Cell className="max-w-xs">
                  {cashFlow.description}
                </Table.Cell>
                <Table.Cell>
                  {formatCurrency(cashFlow.opening_balance)}
                </Table.Cell>
                <Table.Cell>
                  {getMonthAndYearFromAPIDate(cashFlow.created_at)}
                </Table.Cell>
                <Table.Cell>
                  {cashFlow.is_active ? (
                    <SealCheck
                      size={20}
                      weight="fill"
                      className="text-success-500"
                    />
                  ) : (
                    <XCircle
                      size={20}
                      weight="fill"
                      className="text-grayscale-400"
                    />
                  )}
                </Table.Cell>
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
                      className="flex items-center gap-1 !text-primary-600 dark:!text-primary-400"
                      onClick={() => {
                        if (cashFlow.is_active) return;
                        handleOpenActiveConfirm(cashFlow.id);
                      }}
                      disabled={cashFlow.is_active}
                    >
                      <Power /> <span>Ativar</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="flex items-center gap-1"
                      onClick={() => handleOpenFormModal(cashFlow.id)}
                    >
                      <PencilSimple /> <span>Editar</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="flex items-center gap-1 !text-failure-600 dark:!text-failure-400"
                      onClick={() =>
                        handleOpenRemoveConfirm(
                          cashFlow.id,
                          cashFlow.description,
                          cashFlow.opening_balance,
                          getYearFromAPIDate(cashFlow.created_at).toString(),
                        )
                      }
                    >
                      <Trash /> <span>Remover</span>
                    </Dropdown.Item>
                  </Dropdown.Root>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}

      {data.results.length !== 0 && pageCount > 1 && (
        <div className="w-full flex justify-center">
          <PaginationControl
            pageCount={pageCount}
            page={page}
            onPageChange={(newPage) => handleChangePage(newPage)}
            previousLabel={<CaretLeft />}
            nextLabel={<CaretRight />}
            className="mt-6 mb-3"
          />
        </div>
      )}

      {data.results.length === 0 && (
        <EmptyState
          title="Nenhum caixa encontrado"
          subtitle="Altere o campo de busca ou adicione um novo."
          addNewLabel="Novo caixa"
          onAddNew={() => handleOpenFormModal()}
        />
      )}
    </Card>
  );
}
