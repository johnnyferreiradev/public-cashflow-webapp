import { Textarea } from 'nemea-ui';

import { cn } from '@/utils/cn';

import { LimitedTextareaProps } from './types';

export default function LimitedTextarea({
  limit,
  value,
  onChange,
  actions,
  ...rest
}: LimitedTextareaProps) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length <= limit) {
      onChange?.(event);
    }
  };

  return (
    <Textarea
      {...rest}
      value={value}
      onChange={handleChange}
      actions={
        <div className="flex items-center gap-1">
          {actions}
          <p
            className={cn(
              'h-5 pl-1 text-xs text-grayscale-400 font-medium',
              'leading-5',
            )}
          >{`${value ? (value as string).length : 0}/${limit}`}</p>
        </div>
      }
    />
  );
}
