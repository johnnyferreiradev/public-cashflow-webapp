import { ButtonSizes, ButtonThemes } from 'nemea-ui';

export type FetchComboboxFetchItemsAction = (params: {
  search?: string;
  page?: number;
  details?: 'minimal' | 'full';
}) => Promise<any>;

export interface FetchComboboxProps<T extends object> {
  contentClassName?: string;
  fetchItems: FetchComboboxFetchItemsAction;
  fetchExtraParams?: T;
  debounceTime?: number;
  fetchKey: string;
  defaultValue?: string;
  defaultLabel?: string;
  onValueChange?: (value: string | null, label: string | null) => void;
  triggerClassName?: string;
  triggerSize?: keyof typeof ButtonSizes;
  triggerTheme?: keyof typeof ButtonThemes;
  placeholder?: string;
  searchPlaceholder?: string;
  notFoundMessage?: string;
  errorMessage?: string;
  disabled?: boolean;
}
