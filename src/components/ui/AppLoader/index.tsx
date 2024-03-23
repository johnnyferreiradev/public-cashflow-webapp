import { cn } from '@/utils/cn';

import { Loader } from 'nemea-ui';
import Logo from '../Logo';

import { AppLoaderProps } from './types';

export default function AppLoader({ className = '', id }: AppLoaderProps) {
  return (
    <div
      className={cn(
        'w-screen h-screen flex flex-col justify-center items-center gap-8',
        'bg-grayscale-50 dark:bg-grayscale-950',
        className,
      )}
      id={id}
    >
      <Logo className="w-80 my-0 mx-auto lg:mx-0 animate-bounce" />
      <Loader />
    </div>
  );
}
