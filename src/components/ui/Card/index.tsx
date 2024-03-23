import { cn } from '@/utils/cn';

import { CardProps } from './types';

export default function Card({ className = '', id, children }: CardProps) {
  return (
    <div
      className={cn('bg-light dark:bg-grayscale-900 p-4 rounded-lg', className)}
      id={id}
    >
      {children}
    </div>
  );
}
