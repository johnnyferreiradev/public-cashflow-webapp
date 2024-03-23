export interface PaginationControlProps {
  className?: string;
  onPageChange?: (page: number) => void;
  pageRangeDisplayed?: number;
  page?: number;
  pageCount: number;
  previousLabel?: React.ReactNode;
  breakLabel?: React.ReactNode;
  nextLabel?: React.ReactNode;
}
