import { Input } from 'nemea-ui';
import { cn } from '@/utils/cn';
import { LimitedInputProps } from './types';

export default function LimitedInput({
  limit,
  value,
  onChange,
  actions,
  ...rest
}: LimitedInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;

    if (inputValue.length > limit) {
      inputValue = inputValue.slice(0, limit);
    }

    onChange?.({
      ...event,
      target: {
        ...event.target,
        value: inputValue,
      },
    });
  };

  return (
    <Input
      {...rest}
      value={value}
      onChange={handleChange}
      onPaste={(event) => {
        const pastedText = event.clipboardData.getData('text');
        const truncatedText = pastedText.slice(0, limit);
        handleChange({
          ...event,
          // @ts-ignore
          target: {
            ...event.target,
            value: truncatedText,
          },
        });
      }}
      actions={
        <div className="flex items-center gap-1">
          {actions}
          <p
            className={cn(
              'h-5 pl-1 border-l border-l-grayscale-300 dark:border-l-grayscale-600 text-xs text-grayscale-400 font-medium',
              'leading-5',
            )}
          >{`${value ? (value as string).length : 0}/${limit}`}</p>
        </div>
      }
    />
  );
}
