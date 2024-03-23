import { formatCurrency } from '@/utils/currency';
import { CustomTooltipProps } from './types';

export const CustomTooltip = ({
  active,
  payload,
  label,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-light dark:bg-grayscale-800 p-4 rounded-md shadow-md">
        <p className="font-semibold">{label}</p>
        <p className="text-success-600 dark:text-success-300 tracking-tight">
          Total de entradas: {formatCurrency(payload[0].value)}
        </p>
        <p className="text-failure-600 dark:text-failure-300 tracking-tight">
          Total de saídas: {formatCurrency(payload[1].value)}
        </p>
      </div>
    );
  }
  return null;
};
