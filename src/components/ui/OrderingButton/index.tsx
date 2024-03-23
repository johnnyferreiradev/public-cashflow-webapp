import { useState } from 'react';
import { Button } from 'nemea-ui';
import { CaretDown, CaretUp, CaretUpDown } from '@phosphor-icons/react';

import { cn } from '@/utils/cn';

import { OrderingButtonProps } from './types';

export default function OrderingButton({
  fieldName,
  value = '',
  onClick,
  className,
  ...rest
}: OrderingButtonProps) {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChangeValue = () => {
    let newValue = '';

    if (currentValue === '') {
      newValue = `-${fieldName}`;
    }

    if (currentValue.includes('-')) {
      newValue = fieldName;
    }

    if (currentValue === fieldName) {
      newValue = '';
    }

    setCurrentValue(newValue);
    onClick?.(newValue, fieldName);
  };

  return (
    <Button.Root
      {...rest}
      theme="linkPrimary"
      size="sm"
      onClick={handleChangeValue}
      className={cn('p-0', className)}
    >
      <Button.Label>
        {currentValue === '' && (
          <CaretUpDown
            size={16}
            weight="bold"
            className="text-primary-600 dark:text-primary-400"
          />
        )}
        {currentValue === `-${fieldName}` && (
          <CaretDown
            size={16}
            weight="bold"
            className="text-primary-600 dark:text-primary-400"
          />
        )}
        {currentValue === fieldName && (
          <CaretUp
            size={16}
            weight="bold"
            className="text-primary-600 dark:text-primary-400"
          />
        )}
      </Button.Label>
    </Button.Root>
  );
}
