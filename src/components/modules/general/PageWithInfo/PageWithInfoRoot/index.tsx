import { cn } from '@/utils/cn';

import { PageWithInfoRootProps } from './types';

export default function PageWithInfoRoot({
  className = '',
  id,
  children,
}: PageWithInfoRootProps) {
  return (
    <div
      className={cn(
        'w-full px-3 md:!px-8 md:max-h-[calc(100%-64px)]',
        'grid grid-rows-1 grid-cols-12 gap-6',
        className,
      )}
      id={id}
    >
      {children}
    </div>
  );
}
