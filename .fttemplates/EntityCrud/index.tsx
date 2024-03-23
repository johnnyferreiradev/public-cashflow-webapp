'use client';

import { Button, Dropdown, Table } from 'nemea-ui';
import {
  CaretLeft,
  CaretRight,
  DotsThreeVertical,
  FunnelSimple,
  MagnifyingGlass,
  PencilSimple,
  Plus,
  Trash,
} from '@phosphor-icons/react';

import { cn } from '@/utils/cn';

import { use[FTName]sTable } from './hook';

import Card from '@/components/Card';
import [FTName]sTableLoading from './components/[FTName]TableLoading';
import ClientErrorBoundary from '@/components/ClientErrorBoundary';
import DebouncedInput from '@/components/DebouncedInput';
import [FTName]sFilterModal from './components/[FTName]FilterModal';
import [FTName]RemoveConfirm from './components/[FTName]RemoveConfirm';
import PaginationControl from '@/components/PaginationControl';
import EmptyState from '@/components/EmptyState';
import OrderingButton from '@/components/OrderingButton';
import [FTName]FormModal from './components/[FTName]FormModal';

import { [FTName]ListTableProps } from './types';

export default function [FTName]ListTable({
  className = '',
  id,
}: [FTName]ListTableProps) {
  const {
    data,
    isError,
    isPending,
    search,
    handleChangeSearch,
    ordering,
    handleChangeOrdering,
    id: <FTName | camelcase>Id,
    name: <FTName | camelcase>Name,
    handleRefetch,
    filterModalIsOpen,
    setFilterModalIsOpen,
    handleApplyFilters,
    filters,
    filterCount,
    page,
    handleChangePage,
    pageCount,
    formModalIsOpen,
    handleOpenFormModal,
    handleFormClose,
    removeConfirmIsOpen,
    handleOpenRemoveConfirm,
    handleRemoveClose,
  } = use[FTName]sTable();

  if (isPending) {
    return <[FTName]sTableLoading />;
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
            initialValue={search}
            onChange={handleChangeSearch}
            autoFocus={search !== ''}
          />
          <Button.Root
            size="sm"
            className="w-10"
            theme="grayPrimary"
            onClick={() => setFilterModalIsOpen(true)}
          >
            {filterCount > 0 && <Button.Badge>{filterCount}</Button.Badge>}
            <Button.Label>
              <FunnelSimple size={18} weight="bold" />
            </Button.Label>
          </Button.Root>
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
          <Button.Label className="hidden md:!block">
            Novo <FTName | lowercase>
          </Button.Label>
        </Button.Root>

        <[FTName]FormModal
          id={<FTName | camelcase>Id}
          name={<FTName | camelcase>Name}
          open={formModalIsOpen}
          onClose={() => handleFormClose()}
        />

        <[FTName]sFilterModal
          open={filterModalIsOpen}
          onClose={() => setFilterModalIsOpen(false)}
          onApply={(filters) => {
            setFilterModalIsOpen(false);
            handleApplyFilters(filters);
          }}
          initialFilters={filters}
        />

        {<FTName | camelcase>.id && <FTName | camelcase>.name && (
          <[FTName]DetailsModal
            id={<FTName | camelcase>.id}
            name={<FTName | camelcase>.name}
            open={detailsModal.isOpen}
            onClose={() => detailsModal.handleClose()}
          />
        )}

        {<FTName | camelcase>Id && <FTName | camelcase>Name && (
          <[FTName]RemoveConfirm
            id={<FTName | camelcase>Id}
            name={<FTName | camelcase>Name}
            open={removeConfirmIsOpen}
            onClose={handleRemoveClose}
          />
        )}
      </header>

      {data.results.length > 0 && (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head className="flex items-center gap-1 min-w-[200px]">
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
            {data.results.map((<FTName | camelcase>, index) => (
              <Table.Row key={index}>
                <Table.Cell>{<FTName | camelcase>.name}</Table.Cell>
                <Table.Cell>{<FTName | camelcase>.description}</Table.Cell>
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
                  >
                    <Dropdown.Item
                      className="flex items-center gap-1"
                      onClick={() =>
                        handleOpenFormModal(<FTName | camelcase>.id, <FTName | camelcase>.name)
                      }
                    >
                      <PencilSimple /> <span>Editar</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="flex items-center gap-1 !text-failure-600 dark:!text-failure-400"
                      onClick={() =>
                        handleOpenRemoveConfirm(<FTName | camelcase>.id, <FTName | camelcase>.name)
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
          title="Nenhum <FTName | lowercase> encontrado"
          subtitle="Altere o campo de busca ou adicione um novo."
          addNewLabel="Nova <FTName | lowercase>"
          onAddNew={() => handleOpenFormModal()}
        />
      )}
    </Card>
  );
}
