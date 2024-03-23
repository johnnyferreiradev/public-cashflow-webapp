import { InfiniteScrollScrollBarProps } from './types';
import { ScrollArea } from 'nemea-ui';

export default function InfiniteScrollScrollBar({
  className,
  orientation = 'vertical',
  id,
}: InfiniteScrollScrollBarProps) {
  return (
    <ScrollArea.ScrollBar
      className={className}
      orientation={orientation}
      id={id}
    />
  );
}
