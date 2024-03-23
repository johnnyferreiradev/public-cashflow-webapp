import { cn } from '@/utils/cn';

import { [FTName]Props } from './types';

export default function [FTName]({ className = '', id }: [FTName]Props) {
  return <div className={cn(className)} id={id}>[FTName]</div>;
}
