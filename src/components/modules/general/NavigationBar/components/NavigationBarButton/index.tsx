import { Button } from 'nemea-ui';
import Link from 'next/link';

import { cn } from '@/utils/cn';

import { NavigationBarButtonProps } from './types';

export default function NavigationBarButton({
  className = '',
  icon,
  href,
  title,
  id,
  active,
  onClick,
  disabled,
}: NavigationBarButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5">
      <Button.Root
        asChild={!!href}
        theme={!active ? 'linkGray' : 'linkPrimary'}
        className={cn('w-max max-w-[48px] min-h-[48px] !pb-0', className)}
        id={id}
        onClick={onClick}
        size="xs"
        disabled={disabled}
      >
        {href ? (
          <Link href={href}>{icon}</Link>
        ) : (
          <Button.Label>{icon}</Button.Label>
        )}
      </Button.Root>
      {title && <p className="text-[10px]">{title}</p>}
    </div>
  );
}
