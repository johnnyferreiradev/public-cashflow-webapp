'use client';

import { Button, Dropdown, Table } from 'nemea-ui';
import {
  CaretLeft,
  CaretRight,
  DotsThreeVertical,
  MagnifyingGlass,
  PencilSimple,
  Plus,
  Trash,
} from '@phosphor-icons/react';

import { cn } from '@/utils/cn';

import { useCategoriesTable } from './hook';

import Card from '@/components/ui/Card';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import EmptyState from '@/components/ui/EmptyState';
import CategoryFormModal from '@/components/modules/cashflow/CategoryFormModal';
import CategoriesTableLoading from './components/CategoriesTableLoading';
import DebouncedInput from '@/components/ui/DebouncedInput';
import OrderingButton from '@/components/ui/OrderingButton';
import PaginationControl from '@/components/ui/PaginationControl';
import CategoryRemoveConfirm from './components/CategoryRemoveConfirm';

import { CategoriesTableProps } from './types';

export default function CategoriesTable({
  className = '',
  id,
}: CategoriesTableProps) {
  const {
    data,
    isError,
    isPending,
    search,
    handleChangeSearch,
    ordering,
    handleChangeOrdering,
    handleRefetch,
    formModalIsOpen,
    page,
    handleChangePage,
    pageCount,
    handleOpenFormModal,
    categoryId,
    categoryName,
    handleFormClose,
    removeConfirmIsOpen,
    handleOpenRemoveConfirm,
    handleRemoveClose,
  } = useCategoriesTable();

  if (isPending) {
    return <CategoriesTableLoading />;
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
    <Card className={cn('w-full mt-4 md:!mt-8', className)} id={id}>
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
            initialValue={search}
            onChange={handleChangeSearch}
            autoFocus={search !== ''}
          />
        </div>

        <Button.Root
          theme="primary"
          size="sm"
          onClick={() => handleOpenFormModal()}
          className="ml-3 min-w-[40px] min-h-[36px]"
        >
          <Button.Icon>
            <Plus weight="bold" />
          </Button.Icon>
          <Button.Label className="hidden md:!block">
            Nova categoria
          </Button.Label>
        </Button.Root>

        <CategoryFormModal
          id={categoryId}
          name={categoryName}
          open={formModalIsOpen}
          onClose={handleFormClose}
        />

        {categoryId && categoryName && (
          <CategoryRemoveConfirm
            id={categoryId}
            name={categoryName}
            open={removeConfirmIsOpen}
            onClose={handleRemoveClose}
          />
        )}
      </header>

      {data && data.results.length > 0 && (
        <Table.Root className="w-full default-scroll mt-8">
          <Table.Header>
            <Table.Row>
              <Table.Head className="flex items-center gap-1 min-w-[140px]">
                <p>Nome</p>
                <OrderingButton
                  fieldName="name"
                  value={ordering}
                  onClick={handleChangeOrdering}
                />
              </Table.Head>
              <Table.Head className="min-w-[200px]">Descrição</Table.Head>
              <Table.Head className="w-16">Ações</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.results.map((category, index) => (
              <Table.Row key={index}>
                <Table.Cell className="max-w-xs">{category.name}</Table.Cell>
                <Table.Cell className="max-w-xs">
                  {category.description || '-'}
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
                      className="flex items-center gap-1"
                      onClick={() =>
                        handleOpenFormModal(category.id, category.name)
                      }
                    >
                      <PencilSimple /> <span>Editar</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="flex items-center gap-1 !text-failure-600 dark:!text-failure-400"
                      onClick={() =>
                        handleOpenRemoveConfirm(category.id, category.name)
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

      {data?.results.length !== 0 && pageCount > 1 && (
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

      {data?.results.length === 0 && (
        <EmptyState
          title="Nenhuma categoria encontrada"
          subtitle="Altere o campo de busca ou adicione uma nova categoria."
          addNewLabel="Nova categoria"
          onAddNew={() => handleOpenFormModal()}
        />
      )}
    </Card>
  );
}
