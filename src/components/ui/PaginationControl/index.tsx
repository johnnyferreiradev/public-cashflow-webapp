import ReactPaginate from 'react-paginate';

import { cn } from '@/utils/cn';

import { PaginationControlProps } from './types';

const PaginationControl = ({
  className = '',
  onPageChange,
  pageRangeDisplayed = 1,
  page,
  pageCount,
  breakLabel,
  nextLabel,
  previousLabel,
}: PaginationControlProps) => {
  const currentPage = page !== undefined ? page - 1 : undefined;

  return (
    <ReactPaginate
      className={cn(
        'au-pagination-control w-max flex items-center justify-between',
        className,
      )}
      pageClassName={cn(
        'text-base font-semibold rounded-md',
        'bg-grayscale-50 dark:bg-grayscale-800',
        'hover:bg-grayscale-100 dark:hover:bg-grayscale-700',
        'h-9 w-9 p-0 mx-0.5',

        '[&>a]:rounded-md [&>a]:p-4 [&>a]:h-9 [&>a]:h-9 [&>a]:flex [&>a]:items-center [&>a]:justify-center',
        '[&.selected]:bg-primary-500 [&.selected]:text-light [&.selected:hover]:bg-primary-600',
        '[&>a]:outline-grayscale-100',
        'dark:text-light [&>a]:dark:outline-grayscale-700',
      )}
      breakClassName={cn(
        'mx-0.5 [&>a]:h-9 [&>a]:w-9 [&>a]:flex [&>a]:items-center [&>a]:justify-center [&>a]:outline-grayscale-100',
        '[&>a]:rounded-md [&>a]:bg-grayscale-50 [&>a:hover]:bg-grayscale-100',
        '[&>a]:dark:text-light [&>a]:dark:bg-grayscale-800 [&>a]:dark:hover:bg-grayscale-700 [&>a]:dark:outline-grayscale-700',
      )}
      nextClassName={cn(
        'ml-0.5 [&>a]:h-9 [&>a]:w-9 [&>a]:flex [&>a]:items-center [&>a]:justify-center [&>a]:outline-grayscale-100',
        '[&>a]:text-primary-500 [&>a]:rounded-md [&>a]:bg-grayscale-50 [&>a]:hover:bg-grayscale-100 [&>a]:text-lg',
        '[&>a_i]:leading-4 [&.disabled>a]:opacity-40 [&.disabled>a]:cursor-auto',
        '[&>a]:dark:text-light [&>a]:dark:bg-grayscale-800 [&>a]:dark:hover:bg-grayscale-700 [&>a]:dark:outline-grayscale-700',
        '[&.disabled_a]:hover:bg-grayscale-50 [&.disabled_a]:dark:hover:bg-grayscale-800 [&>a[aria-disabled="true"]_i]:dark:text-grayscale-700',
      )}
      previousClassName={cn(
        'mr-0.5 [&>a]:h-9 [&>a]:w-9 [&>a]:flex [&>a]:items-center [&>a]:justify-center [&>a]:outline-grayscale-100',
        '[&>a]:text-primary-500 [&>a]:rounded-md [&>a]:bg-grayscale-50 [&>a]:hover:bg-grayscale-100 [&>a]:text-lg',
        '[&>a_i]:leading-4 [&.disabled>a]:opacity-40 [&.disabled>a]:cursor-auto',
        '[&>a]:dark:text-light [&>a]:dark:bg-grayscale-800 [&>a]:dark:hover:bg-grayscale-700 [&>a]:dark:outline-grayscale-700',
        '[&.disabled_a]:hover:bg-grayscale-50 [&.disabled_a]:dark:hover:bg-grayscale-800 [&>a[aria-disabled="true"]_i]:dark:text-grayscale-700',
      )}
      onPageChange={({ selected }) => onPageChange?.(selected + 1)}
      forcePage={currentPage}
      pageRangeDisplayed={pageRangeDisplayed}
      pageCount={pageCount}
      previousLabel={previousLabel}
      breakLabel={breakLabel}
      nextLabel={nextLabel}
    />
  );
};

export default PaginationControl;
