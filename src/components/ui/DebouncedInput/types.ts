import { InputProps } from 'nemea-ui';

export interface DebouncedInputProps extends Omit<InputProps, 'onChange'> {
  initialValue?: string;
  debounceTime?: number;
  onChange?: (value: string) => void;
}
