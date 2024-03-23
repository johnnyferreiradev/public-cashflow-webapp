import { Separator, Skeleton } from 'nemea-ui';

import { cn } from '@/utils/cn';

import { TotalCardLoadingProps } from './types';

export default function TotalCardLoading({
  className = '',
  id,
}: TotalCardLoadingProps) {
  return (
    <div className={cn(className)} id={id}>
      <Skeleton width="180px" height="18px" className="mb-2" />
      <Skeleton width="30%" height="18px" />
      <Separator className="my-4" />
      <div className="w-full flex items-center justify-between">
        <Skeleton width="200px" height="36px" />
        <Skeleton width="20px" height="20px" className="rounded-full" />
      </div>
    </div>
  );
}
