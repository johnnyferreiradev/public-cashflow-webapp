import { cn } from '@/utils/cn';

import { PageWithInfoInfoSectionProps } from './types';

export default function PageWithInfoInfoSection({
  className = '',
  id,
  children,
}: PageWithInfoInfoSectionProps) {
  return (
    <div
      className={cn(
        'hidden lg:!flex flex-col gap-8 my-8 col-span-0 lg:col-span-4 xl:col-span-3',
        'h-full max-h-[calc(100%-64px)] overflow-y-scroll no-scrollbar',
        className,
      )}
      id={id}
    >
      {children}
    </div>
  );
}
