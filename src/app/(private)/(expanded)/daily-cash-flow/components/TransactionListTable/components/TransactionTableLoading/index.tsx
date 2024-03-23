import { Skeleton, Table } from 'nemea-ui';

import { cn } from '@/utils/cn';

import Card from '@/components/ui/Card';

import { TransactionsTableLoadingProps } from './types';

const TableRow = () => (
  <Table.Row>
    <Table.Cell>
      <Skeleton width="120px" height="20px" />
    </Table.Cell>
    <Table.Cell>
      <Skeleton width="180px" height="20px" />
    </Table.Cell>
    <Table.Cell>
      <Skeleton width="80px" height="20px" />
    </Table.Cell>
    <Table.Cell>
      <Skeleton width="140px" height="20px" />
    </Table.Cell>
    <Table.Cell>
      <Skeleton width="30px" height="30px" className="ml-4" />
    </Table.Cell>
  </Table.Row>
);

export default function TransactionsTableLoading({
  className = '',
  id,
}: TransactionsTableLoadingProps) {
  return (
    <Card className={cn('w-full mt-4 md:!mt-8', className)} id={id}>
      <header className="mb-4 flex items-center justify-between">
        <div className="flex gap-1">
          <Skeleton width="263px" height="38px" />
          <Skeleton width="40px" height="38px" />
        </div>
        <Skeleton width="150px" height="38px" />
      </header>
      <div className="w-full mt-8">
        <Table.Root className="w-full default-scroll">
          <Table.Header>
            <Table.Row>
              <Table.Head className="flex items-center gap-1 min-w-[200px]">
                <Skeleton width="80px" height="20px" />
              </Table.Head>
              <Table.Head className="min-w-[200px]">
                <Skeleton width="120px" height="20px" />
              </Table.Head>
              <Table.Head className="min-w-[120px]">
                <Skeleton width="60px" height="20px" />
              </Table.Head>
              <Table.Head className="min-w-[200px]">
                <Skeleton width="120px" height="20px" />
              </Table.Head>
              <Table.Head className="w-16">
                <Skeleton width="60px" height="20px" />
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
          </Table.Body>
        </Table.Root>
      </div>
    </Card>
  );
}
