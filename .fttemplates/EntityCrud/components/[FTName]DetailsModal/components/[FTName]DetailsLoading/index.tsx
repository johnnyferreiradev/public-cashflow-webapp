import { Separator, Skeleton } from 'nemea-ui';

import { cn } from '@/utils/cn';

import { [FTName]DetailsLoadingProps } from './types';

export default function [FTName]DetailsLoading({
  className = '',
  id,
}: [FTName]DetailsLoadingProps) {
  return (
    <div className={cn(className)} id={id}>
      <Skeleton width="50%" height="20px" />
      <div className="pb-6">
        <div className="w-full flex items-stretch justify-between gap-4 mt-8 mb-8">
          <div className="flex-1 rounded-md border border-grayscale-100 dark:border-grayscale-800 p-2">
            <Skeleton width="50%" height="20px" className="mb-1" />
            <Skeleton width="80%" height="20px" />
          </div>
          <div className="flex-1 rounded-md border border-grayscale-100 dark:border-grayscale-800 p-2">
            <Skeleton width="50%" height="20px" className="mb-1" />
            <Skeleton width="80%" height="20px" />
          </div>
          <div className="flex-1 rounded-md border border-grayscale-100 dark:border-grayscale-800 p-2">
            <Skeleton width="50%" height="20px" className="mb-1" />
            <Skeleton width="80%" height="20px" />
          </div>
        </div>

        <div className="w-full mt-4">
          <Skeleton width="30%" height="20px" className="mb-2" />
          <div className="flex flex-col gap-1">
            <Skeleton width="80%" height="20px" />
            <Skeleton width="90%" height="20px" />
            <Skeleton width="70%" height="20px" />
          </div>
        </div>

        <Separator className="my-8" />

        <div className="w-full">
          <Skeleton width="20%" height="20px" className="mb-2" />
          <div className="w-full flex items-center gap-2">
            <div className="flex-1">
              <Skeleton width="50%" height="20px" className="mb-1" />
              <div className="flex items-center gap-1">
                <Skeleton width="90%" height="20px" />
              </div>
            </div>
            <div className="flex-1">
              <Skeleton width="50%" height="20px" className="mb-1" />
              <div className="flex items-center gap-1">
                <Skeleton width="90%" height="20px" />
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="w-full">
          <Skeleton width="20%" height="20px" className="mb-2" />
          <div className="w-full flex items-center gap-2">
            <div className="flex-1">
              <Skeleton width="50%" height="20px" className="mb-1" />
              <div className="flex items-center gap-1">
                <Skeleton width="90%" height="20px" />
              </div>
            </div>
            <div className="flex-1">
              <Skeleton width="50%" height="20px" className="mb-1" />
              <div className="flex items-center gap-1">
                <Skeleton width="90%" height="20px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
