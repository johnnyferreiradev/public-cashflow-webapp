import React, { useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Button, Loader, Popover } from 'nemea-ui';
import { CaretDown, Check, MagnifyingGlass } from '@phosphor-icons/react';

import DebouncedInput from '../DebouncedInput';
import { InfiniteScroll } from '../InfiniteScroll';

import { cn } from '@/utils/cn';

import { FetchComboboxProps } from './types';

export default function FetchCombobox({
  contentClassName = '',
  fetchItems,
  debounceTime = 1000,
  fetchKey,
  defaultValue = '',
  defaultLabel = '',
  onValueChange,
  triggerClassName = '',
  triggerSize = 'md',
  triggerTheme = 'grayDark',
  placeholder = 'Selecione...',
  searchPlaceholder = 'Busque por nome',
  fetchExtraParams,
  errorMessage = 'Ocorreu um erro ao buscar',
  notFoundMessage = 'Não encontrado',
  disabled,
}: FetchComboboxProps<{}>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [value, setValue] = useState(defaultValue);
  const [label, setLabel] = useState(defaultLabel);

  const { data, isPending, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [`infinite-combobox-fetch-${fetchKey}`, search],
      queryFn: ({ pageParam = 1 }) =>
        fetchItems({
          page: pageParam,
          search,
          details: 'minimal',
          ...fetchExtraParams,
        }),
      getNextPageParam: (lastPage) =>
        lastPage.next ? lastPage.next.split('page=')[1].split('&')[0] : null,
      initialPageParam: 1,
    });

  const handleChangeSearch = (currentValue: string) => {
    setSearch(currentValue);
  };

  const items = useMemo(() => {
    const currentItems: { id: string; name: string }[] = [];

    data?.pages.forEach((group) => {
      group.results.forEach((item: { id: string; name: string }) => {
        currentItems.push(item);
      });
    });

    return currentItems;
  }, [data]);

  return (
    <Popover.Root
      open={open}
      onOpenChange={(openValue) => {
        setOpen(openValue);
        if (!openValue) {
          setSearch('');
        }
      }}
    >
      <Popover.Trigger asChild disabled={disabled}>
        <Button.Root
          role="combobox"
          aria-expanded={open}
          theme={triggerTheme}
          className={cn(
            'hover:bg-grayscale-100 hover:border-grayscale-100 !justify-between',
            'active:bg-grayscale-200 active:text-dark dark:active:bg-grayscale-800 dark:active:text-light',
            triggerClassName,
          )}
          size={triggerSize}
        >
          <Button.Label
            className={cn(
              'mx-0 truncate min-w-0 max-w-[148px] md:!max-w-[228px]',
              {
                'text-grayscale-400': !value,
              },
            )}
          >
            {label || placeholder}
          </Button.Label>
          <Button.Icon>
            <CaretDown
              weight="thin"
              className="text-grayscale-300 dark:text-grayscale-500"
            />
          </Button.Icon>
        </Button.Root>
      </Popover.Trigger>
      <Popover.Content
        className={cn('w-full max-w-[375px] md:!max-w-max', contentClassName)}
      >
        <DebouncedInput
          placeholder={searchPlaceholder}
          value={search}
          onChange={(currentSearch) => handleChangeSearch(currentSearch)}
          theme="noBorder"
          icon={
            <MagnifyingGlass className="text-grayscale-400" weight="bold" />
          }
          className={cn(
            'py-3 px-4 rounded-none !bg-transparent',
            '!border-t-0 !border-x-0',
            '!border-b-grayscale-100 dark:!border-b-grayscale-900',
          )}
          debounceTime={debounceTime}
        />

        {items.length > 0 && (
          <InfiniteScroll.Root
            fetchDisabled={!hasNextPage || isPending}
            fetchMoreItems={fetchNextPage}
            className={cn('p-3', {
              'h-40': items.length <= 5,
              'h-72': items.length > 5,
            })}
          >
            {items.map((item) => (
              <Button.Root
                key={item.id}
                theme="darkFlat"
                size="sm"
                className={cn(
                  'transition-none w-full outline-transparent',
                  'hover:bg-grayscale-100 dark:hover:bg-grayscale-900',
                )}
                onClick={() => {
                  setValue(item.id === value ? '' : item.id);
                  setLabel(item.id === value ? placeholder : item.name);
                  onValueChange?.(
                    item.id === value ? null : item.id,
                    item.id === value ? null : item.name,
                  );
                  setSearch('');
                  setOpen(false);
                }}
              >
                <Button.Label className="w-full text-base m-0 mx-0.5 text-start font-normal">
                  {item.name}
                </Button.Label>
                <Button.Icon>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === item.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </Button.Icon>
              </Button.Root>
            ))}
          </InfiniteScroll.Root>
        )}

        {!isPending && items.length === 0 && !isError && (
          <p className="text-center p-3 pb-4">{notFoundMessage}</p>
        )}

        {isError && <p className="text-center p-3 pb-4">{errorMessage}</p>}

        {isPending && (
          <div className="w-full flex justify-center p-3 pb-4">
            <Loader />
          </div>
        )}
      </Popover.Content>
    </Popover.Root>
  );
}
