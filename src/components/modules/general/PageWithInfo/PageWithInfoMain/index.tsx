import { cn } from '@/utils/cn';

import { PageWithInfoMainProps } from './types';

export default function PageWithInfoMain({
  className = '',
  id,
  children,
}: PageWithInfoMainProps) {
  return (
    <div
      className={cn(
        'flex flex-col h-full flex-1 col-span-12 lg:col-span-8 xl:col-span-9',
        'pb-24 pt-4 md:!py-8 md:!overflow-y-auto no-scrollbar',
        className,
      )}
      id={id}
    >
      {children}
    </div>
  );
}
