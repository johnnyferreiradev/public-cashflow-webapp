import { Loader } from 'nemea-ui';

import { cn } from '@/utils/cn';

import { ContainerLoaderProps } from './types';

export default function ContainerLoader({
  className = '',
  id,
  children,
}: ContainerLoaderProps) {
  return (
    <div
      className={cn(
        'bg-light/20 dark:bg-dark/20 fixed inset-0 backdrop-blur-xl animate-fade-in overflow-y-auto z-30',
        'flex justify-center items-center flex-col gap-2',
        'rounded-md',
        className,
      )}
      id={id}
    >
      <Loader />
      {children}
    </div>
  );
}
