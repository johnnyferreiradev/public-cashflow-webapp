import { NumericFormat } from 'react-number-format';

import { Input } from 'nemea-ui';

import { CurrencyInputProps } from './types';

export default function CurrencyInput(props: CurrencyInputProps) {
  const { allowNegative = true } = props;

  return (
    <Input {...props} asChild>
      <NumericFormat
        decimalSeparator=","
        prefix="R$ "
        decimalScale={2}
        allowNegative={allowNegative}
        maxLength={14}
      />
    </Input>
  );
}
