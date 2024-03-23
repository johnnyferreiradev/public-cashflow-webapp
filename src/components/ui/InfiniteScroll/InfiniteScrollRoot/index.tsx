import { useEffect, useRef } from 'react';
import { ScrollArea } from 'nemea-ui';

import { cn } from '@/utils/cn';

import { InfiniteScrollRootProps } from './types';

export default function InfiniteScrollRoot({
  className = '',
  id,
  children,
  fetchMoreItems,
  isDocumentScroll = false,
  fetchDisabled,
  offsetBeforeEnd = 0,
  orientation = 'vertical',
}: InfiniteScrollRootProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = !isDocumentScroll ? containerRef.current : document.body;

    const handleScrollY = () => {
      if (
        container &&
        container.scrollTop + container.clientHeight + offsetBeforeEnd ===
          container.scrollHeight
      ) {
        if (!fetchDisabled) {
          fetchMoreItems();
        }
      }
    };

    const handleScrollX = () => {
      if (
        container &&
        container.scrollLeft + container.clientWidth + offsetBeforeEnd >=
          container.scrollWidth
      ) {
        if (!fetchDisabled) {
          fetchMoreItems();
        }
      }
    };

    container?.addEventListener(
      'scroll',
      orientation === 'vertical' ? handleScrollY : handleScrollX,
    );

    return () => {
      container?.removeEventListener(
        'scroll',
        orientation === 'vertical' ? handleScrollY : handleScrollX,
      );
    };
  }, [
    fetchDisabled,
    fetchMoreItems,
    isDocumentScroll,
    offsetBeforeEnd,
    orientation,
  ]);

  return (
    <ScrollArea.Root className={cn(className)} id={id} ref={containerRef}>
      {children}
    </ScrollArea.Root>
  );
}
