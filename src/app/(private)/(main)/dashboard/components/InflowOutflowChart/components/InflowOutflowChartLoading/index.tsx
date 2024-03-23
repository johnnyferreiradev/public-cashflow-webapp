import { Separator, Skeleton } from 'nemea-ui';

import { cn } from '@/utils/cn';

import { InflowOutflowChartLoadingProps } from './types';

export default function InflowOutflowChartLoading({
  className = '',
  id,
}: InflowOutflowChartLoadingProps) {
  return (
    <div className={cn(className)} id={id}>
      <div className="flex justify-between flex-col md:!flex-row">
        <div className="pr-2 mb-4 md:!mb-0 min-w-[220px]">
          <Skeleton
            width="0"
            height="18px"
            className="!w-full !max-w-[160px] mb-2"
          />
          <Skeleton
            width="0"
            height="18px"
            className="!w-full !max-w-[200px]"
          />
        </div>
        <Skeleton width="0px" height="40px" className="!w-full max-w-[300px]" />
      </div>
      <Separator className="my-4" />
      <div className="w-full flex justify-around items-end gap-0.5 pt-8">
        <Skeleton width="0px" height="120px" className="!w-full max-w-[40px]" />
        <Skeleton width="0px" height="200px" className="!w-full max-w-[40px]" />
        <Skeleton width="0px" height="280px" className="!w-full max-w-[40px]" />
        <Skeleton width="0px" height="180px" className="!w-full max-w-[40px]" />
        <Skeleton width="0px" height="200px" className="!w-full max-w-[40px]" />
        <Skeleton width="0px" height="220px" className="!w-full max-w-[40px]" />
        <Skeleton width="0px" height="170px" className="!w-full max-w-[40px]" />
        <Skeleton width="0px" height="210px" className="!w-full max-w-[40px]" />
        <Skeleton width="0px" height="200px" className="!w-full max-w-[40px]" />
        <Skeleton width="0px" height="220px" className="!w-full max-w-[40px]" />
        <Skeleton width="0px" height="170px" className="!w-full max-w-[40px]" />
        <Skeleton width="0px" height="210px" className="!w-full max-w-[40px]" />
      </div>
    </div>
  );
}
