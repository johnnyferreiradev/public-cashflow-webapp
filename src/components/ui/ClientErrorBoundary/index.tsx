import { Button, Image } from 'nemea-ui';
import { ArrowCounterClockwise } from '@phosphor-icons/react';

import { cn } from '@/utils/cn';

import errorIllustration from '@/assets/images/searching-error.svg';

import { ClientErrorBoundaryProps } from './types';

export default function ClientErrorBoundary({
  className = '',
  id,
  onRetry,
  subtitle,
  title,
  hideImage = false,
}: ClientErrorBoundaryProps) {
  return (
    <div
      className={cn('flex flex-col items-center gap-8 py-8', className)}
      id={id}
    >
      {!hideImage && (
        <Image
          src={errorIllustration.src}
          alt="Error illustration"
          className="w-full max-w-xs"
        />
      )}
      <div className="text-center">
        <h1 className="font-bold text-primary-400 text-xl">{title}</h1>
        <p className="text-gray-400 text-lg">{subtitle}</p>
      </div>
      <Button.Root onClick={onRetry}>
        <Button.Icon>
          <ArrowCounterClockwise />
        </Button.Icon>
        <Button.Label>Tentar novamente</Button.Label>
      </Button.Root>
    </div>
  );
}
