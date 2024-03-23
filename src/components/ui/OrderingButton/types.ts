import { ButtonProps } from 'nemea-ui';

export interface OrderingButtonProps extends Omit<ButtonProps, 'onClick'> {
  fieldName: string;
  onClick?: (value: string, fieldName: string) => void;
  value?: string;
}
