export interface InfiniteScrollRootProps {
  className?: string;
  id?: string;
  children?: React.ReactNode;
  fetchMoreItems: () => void;
  isDocumentScroll?: boolean;
  fetchDisabled: boolean;
  offsetBeforeEnd?: number;
  orientation?: 'vertical' | 'horizontal';
}
