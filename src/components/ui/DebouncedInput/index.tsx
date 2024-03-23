import { useEffect, useState } from 'react';
import { Input } from 'nemea-ui';

import { DebouncedInputProps } from './types';

export default function DebouncedInput({
  initialValue = '',
  debounceTime = 1000,
  onChange,
  ...props
}: DebouncedInputProps) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (value !== debouncedValue) {
        setDebouncedValue(value);
        onChange?.(value);
      }
    }, debounceTime);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, onChange, debouncedValue, debounceTime]);

  useEffect(() => {
    setValue((prevValue) =>
      prevValue === initialValue ? prevValue : initialValue,
    );
  }, [initialValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return <Input {...props} value={value} onChange={handleChange} />;
}
