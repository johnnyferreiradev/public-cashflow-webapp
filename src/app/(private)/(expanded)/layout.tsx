'use client';

import { cn } from '@/utils/cn';

import ShortMenu from '@/components/modules/general/ShortMenu';

import useAuthorized from '@/hooks/useAuthorized';
import MainHeader from '@/components/modules/general/MainHeader';

export default function ExpandedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthorized();

  return (
    <div
      className={cn(
        'w-screen max-w-full md:h-screen md:max-h-screen bg-grayscale-50 dark:bg-grayscale-950 flex',
      )}
    >
      <ShortMenu />
      <div className="w-full h-full flex-1 flex flex-col">
        <MainHeader />
        {children}
      </div>
    </div>
  );
}
