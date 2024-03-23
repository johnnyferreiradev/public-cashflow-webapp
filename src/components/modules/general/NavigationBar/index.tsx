import { ChartBar, Money, Toolbox } from '@phosphor-icons/react';

import { cn } from '@/utils/cn';

import { NavigationBarProps } from './types';
import NavigationBarButton from './components/NavigationBarButton';

export default function NavigationBar({
  className = '',
  id,
}: NavigationBarProps) {
  return (
    <div
      className={cn(
        'flex md:!hidden fixed bottom-0 left-0 z-30 w-full',
        'bg-light dark:bg-grayscale-900 items-center justify-evenly gap-4',
        'p-1 !pb-2 border-t border-gray-50 dark:border-gray-800',
        className,
      )}
      id={id}
    >
      {/* <NavigationBarButton
        href="/"
        icon={<House size={26} />}
        title="home"
        active
      /> */}

      <NavigationBarButton
        href="/dashboard"
        icon={<Money size={26} />}
        // title="home"
        active
      />

      <NavigationBarButton
        // href="/"
        icon={<ChartBar size={26} />}
        // title="home"
        active={false}
        disabled
      />

      <NavigationBarButton
        // href="/"
        icon={<Toolbox size={26} />}
        // title="home"
        active={false}
        disabled
      />
    </div>
  );
}
