import { Separator, Skeleton } from 'nemea-ui';

import { cn } from '@/utils/cn';

import { CurrentCashFlowCardLoadingProps } from './types';

export default function CurrentCashFlowCardLoading({
  className = '',
  id,
}: CurrentCashFlowCardLoadingProps) {
  return (
    <div className={cn(className)} id={id}>
      <div className="flex flex-col gap-2">
        <Skeleton width="30%" height="20px" />
        <Skeleton width="80%" height="28px" />
      </div>

      <div className="my-4 md:!my-8 flex md:!block flex-wrap">
        <div className="w-full mb-4 flex-1 min-w-[128px]">
          <Skeleton width="30%" height="20px" className="mb-2" />
          <div className="w-full flex justify-end md:!justify-between gap-2 flex-row-reverse md:!flex-row">
            <Skeleton width="40%" height="28px" />
            <Skeleton width="20px" height="20px" className="rounded-full" />
          </div>
        </div>

        <div className="w-full mb-4 flex-1 min-w-[128px]">
          <Skeleton width="30%" height="20px" className="mb-2" />
          <div className="w-full flex justify-end md:!justify-between gap-2 flex-row-reverse md:!flex-row">
            <Skeleton width="40%" height="28px" />
            <Skeleton width="20px" height="20px" className="rounded-full" />
          </div>
        </div>

        <Separator className="mb-4 hidden md:!block" />

        <div className="w-full mb-0 md:!mb-8 flex-1 min-w-[128px]">
          <Skeleton width="30%" height="20px" className="mb-2" />
          <div className="w-full flex justify-end md:!justify-between gap-2 flex-row-reverse md:!flex-row">
            <Skeleton width="40%" height="28px" />
            <Skeleton width="20px" height="20px" className="rounded-full" />
          </div>
        </div>
      </div>

      <Skeleton width="80%" height="20px" className="mb-2" />
      <Skeleton width="100%" height="40px" />
    </div>
  );
}
