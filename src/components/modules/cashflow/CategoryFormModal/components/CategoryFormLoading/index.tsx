import { Skeleton } from 'nemea-ui';

import { cn } from '@/utils/cn';

import { CategoryFormLoadingProps } from './types';

export default function CategoryFormLoading({
  className = '',
  id,
}: CategoryFormLoadingProps) {
  return (
    <div className={cn(className)} id={id}>
      <div className="flex flex-col gap-2">
        <Skeleton width="30%" height="20px" />
        <Skeleton width="80%" height="20px" />
      </div>
      <div className="my-8 flex flex-col gap-8">
        <Skeleton width="100%" height="40px" />
        <Skeleton width="100%" height="40px" />
        <Skeleton width="100%" height="80px" />
        <Skeleton width="100%" height="40px" />
      </div>
      <div className="flex justify-between w-full">
        <Skeleton width="25%" height="40px" />
        <Skeleton width="25%" height="40px" />
      </div>
    </div>
  );
}
