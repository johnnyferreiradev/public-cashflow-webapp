'use client';

import { cn } from '@/utils/cn';

import ShortMenu from '@/components/modules/general/ShortMenu';
import ModuleMenu from '@/components/modules/general/ModuleMenu';

import MainHeader from '@/components/modules/general/MainHeader';
import NavigationBar from '@/components/modules/general/NavigationBar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'w-screen max-w-full md:h-screen md:max-h-screen bg-grayscale-50 dark:bg-grayscale-950 flex',
      )}
    >
      <ShortMenu />
      <ModuleMenu />
      <div className="flex-1 h-full flex flex-col">
        <MainHeader />
        {children}
      </div>
      <NavigationBar />
    </div>
  );
}
