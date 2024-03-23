import { Skeleton } from 'nemea-ui';

import { cn } from '@/utils/cn';

import Card from '@/components/ui/Card';

import { CurrentCashFlowBannerLoadingProps } from './types';

export default function CurrentCashFlowBannerLoading({
  className = '',
  id,
}: CurrentCashFlowBannerLoadingProps) {
  return (
    <Card
      className={cn(
        'flex justify-between items-center flex-col lg:!flex-row rounded-lg',
        'p-4 md:!p-8 gap-4',
        className,
      )}
      id={id}
    >
      <div className="w-full flex-1 flex items-center justify-between flex-col md:!flex-row flex-wrap gap-16 mb-8 lg:!mb-0">
        <div className="flex flex-row flex-wrap md:!flex-col w-full">
          <div className="flex flex-row items-center gap-4">
            <Skeleton
              width="80px"
              height="80px"
              className="rounded-full mb-2"
            />
            <div>
              <Skeleton width="160px" height="20px" className="mb-2" />
              <Skeleton width="120px" height="20px" />
            </div>
          </div>
          <Skeleton width="300px" height="20px" className="mt-4 mb-2" />
          <Skeleton width="320px" height="20px" className="mb-2" />
          <Skeleton width="280px" height="20px" />
        </div>

        <div
          className={cn(
            'w-full max-w-4xl flex sm:!grid flex-wrap gap-6',
            'sm:grid-cols-2 sm:grid-rows-2',
            '2xl:grid-cols-4 2xl:grid-rows-1',
          )}
        >
          <div className="w-max">
            <Skeleton width="80px" height="20px" className="mb-2" />
            <div className="w-full flex gap-2">
              <Skeleton width="130px" height="30px" />
            </div>
          </div>

          <div className="w-max">
            <Skeleton width="80px" height="20px" className="mb-2" />
            <div className="w-full flex gap-2">
              <Skeleton width="130px" height="30px" />
            </div>
          </div>

          <div className="w-max">
            <Skeleton width="80px" height="20px" className="mb-2" />
            <div className="w-full flex gap-2">
              <Skeleton width="130px" height="30px" />
            </div>
          </div>

          <div className="w-max">
            <Skeleton width="80px" height="20px" className="mb-2" />
            <div className="w-full flex gap-2">
              <Skeleton width="130px" height="30px" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:!w-max h-full rounded-lg p-4 flex flex-col items-center justify-evenly">
        <Skeleton width="128px" height="128px" className="mb-2" />
        <Skeleton width="100px" height="20px" className="mb-2" />
        <Skeleton width="140px" height="40px" />
      </div>
    </Card>
  );
}
