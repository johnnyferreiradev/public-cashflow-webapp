'use client';

import {
  ArrowDown,
  ArrowUp,
  Equals,
  Play,
  SmileySad,
} from '@phosphor-icons/react';
import { Separator, Badge } from 'nemea-ui';

import { cn } from '@/utils/cn';

import Card from '@/components/ui/Card';
import TotalCardLoading from './components/TotalCardLoading';

import { TotalCardProps } from './types';

export default function TotalCard({
  className = '',
  id,
  status,
  title,
  total,
  description,
  isError,
  isLoading,
}: TotalCardProps) {
  const statusIcons = {
    positive: <ArrowUp size={18} weight="bold" className="text-success-400" />,
    negative: (
      <ArrowDown size={18} weight="bold" className="text-failure-400" />
    ),
    equal: <Equals size={18} weight="bold" className="text-primary-400" />,
    start: <Play size={18} weight="bold" className="text-primary-400" />,
  };

  return (
    <Card
      className={cn('flex-1 min-w-[288px] min-h-[160px]', className)}
      id={id}
    >
      {isLoading && <TotalCardLoading />}

      {isError && (
        <div className="w-full h-[128px] flex flex-col justify-center items-center gap-2">
          <SmileySad size={36} />
          <p>Ocorreu um erro ao exibir os dados</p>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-base text-gray-400">{description}</p>
          <Separator className="my-4" />
          <div className="w-full max-w-full overflow-x-auto flex items-center gap-2 justify-between default-scroll">
            <p className="font-bold text-3xl flex gap-1">
              <span className="text-xs pt-1.5">R$</span>{' '}
              <span>{total.replace('R$', '')}</span>
            </p>
            <Badge theme="gray">{statusIcons[status]}</Badge>
          </div>
        </>
      )}
    </Card>
  );
}
