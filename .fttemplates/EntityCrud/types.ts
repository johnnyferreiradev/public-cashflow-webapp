import { SetStateAction } from '@/utils/types';
import { [FTName]sResponse } from '@/services/module/<FTName | camelcase>/types';

export interface [FTName]sTableFilter {
  type?: string;
  subtype?: string;
}

export interface Use[FTName]sTableResult {
  data: [FTName]sResponse;
  isPending: boolean;
  isError: boolean;
  search: string;
  handleChangeSearch: (value: string) => void;
  ordering: string;
  handleChangeOrdering: (value: string) => void;
  handleRefetch: () => void;
  formModalIsOpen: boolean;
  filterModalIsOpen: boolean;
  setFilterModalIsOpen: SetStateAction<boolean>;
  handleApplyFilters: (filters: [FTName]sTableFilter) => void;
  filters: [FTName]sTableFilter;
  filterCount: number;
  page: number;
  handleChangePage: (page: number) => void;
  pageCount: number;
  handleOpenFormModal: (id?: string, name?: string) => void;
  id?: string;
  name?: string;
  handleFormClose: () => void;
  removeConfirmIsOpen: boolean;
  handleOpenRemoveConfirm: (id: string, name: string) => void;
  handleRemoveClose: () => void;
}

export interface [FTName]ListTableProps {
  className?: string;
  id?: string;
}
