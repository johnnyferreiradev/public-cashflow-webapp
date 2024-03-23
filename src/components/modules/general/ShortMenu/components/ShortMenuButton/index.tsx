import { cn } from '@/utils/cn';
import { Button, Tooltip } from 'nemea-ui';
import Link from 'next/link';

import { ShortMenuButtonProps } from './types';

export default function ShortMenuButton({
  className = '',
  icon,
  href,
  tooltipMessage,
  id,
  active,
  onClick,
  tooltipSide = 'right',
  disabled,
  badge,
}: ShortMenuButtonProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button.Root
          asChild={!!href}
          theme={!active ? 'grayDark' : 'primary'}
          className={cn('w-max max-w-[54px]', className)}
          id={id}
          onClick={onClick}
          disabled={disabled}
        >
          <div>
            {badge && (
              <Button.Badge className="text-[10px] min-w-max absolute right-0 max-h-max top-10 py-0 px-1 rounded-md leading-3">
                {badge}
              </Button.Badge>
            )}
            {href ? (
              <Link href={href}>{icon}</Link>
            ) : (
              <Button.Label>{icon}</Button.Label>
            )}
          </div>
        </Button.Root>
      </Tooltip.Trigger>
      {tooltipMessage && (
        <Tooltip.Content side={tooltipSide}>
          <Tooltip.Arrow />
          <p className="px-2 py-1">{tooltipMessage}</p>
        </Tooltip.Content>
      )}
    </Tooltip.Root>
  );
}
