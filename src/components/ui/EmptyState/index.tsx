import { Button, Image } from 'nemea-ui';
import { Plus } from '@phosphor-icons/react';

import { cn } from '@/utils/cn';

import voidResult from '@/assets/images/void-result.svg';

import { EmptyStateProps } from './types';

export default function EmptyState({
  className = '',
  id,
  onAddNew,
  subtitle,
  title,
  addNewLabel,
}: EmptyStateProps) {
  return (
    <div
      className={cn('flex flex-col items-center gap-8 py-8', className)}
      id={id}
    >
      <Image src={voidResult.src} alt="Not found" className="w-28" />
      <div className="text-center max-w-xs">
        <h1 className="font-bold text-primary-400 text-lg">{title}</h1>
        <p className="text-gray-400">{subtitle}</p>
      </div>
      {onAddNew && (
        <Button.Root onClick={onAddNew} theme="grayPrimary" size="sm">
          <Button.Icon>
            <Plus weight="bold" />
          </Button.Icon>
          <Button.Label>{addNewLabel || 'Novo'}</Button.Label>
        </Button.Root>
      )}
    </div>
  );
}
