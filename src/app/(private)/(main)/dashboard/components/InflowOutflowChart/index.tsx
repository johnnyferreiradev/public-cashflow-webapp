'use client';

import {
  BarChart,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Bar,
} from 'recharts';
import { Separator, Tabs } from 'nemea-ui';

import { cn } from '@/utils/cn';

import { CustomTooltip } from './components/CustomTooltip';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';

import { useInflowOutflowChart } from './hooks';

import { InflowOutflowChartProps } from './types';
import InflowOutflowChartLoading from './components/InflowOutflowChartLoading';

export default function InflowOutflowChart({
  className = '',
  id,
}: InflowOutflowChartProps) {
  const {
    periods,
    selectedPeriod,
    handleChangePeriod,
    isError,
    isLoading,
    refetch,
    periodLabel,
  } = useInflowOutflowChart();

  return (
    <div className={cn('h-max w-full flex flex-col', className)} id={id}>
      {isError && (
        <ClientErrorBoundary
          title="Ops! Algo de errado aconteceu."
          subtitle="Tente novamente mais tarde ou contate o suporte."
          onRetry={refetch}
          className="[&_img]:max-w-[140px]"
        />
      )}

      {isLoading && <InflowOutflowChartLoading />}

      {!isLoading && !isError && (
        <>
          <div className="flex justify-between flex-col md:!flex-row">
            <div className="pr-2 mb-4 md:!mb-0">
              <h3 className="text-lg font-medium">
                Receitas e despesas no período
              </h3>
              <p className="text-base text-gray-400">{periodLabel}</p>
            </div>
            <Tabs.Root
              defaultValue={selectedPeriod}
              onValueChange={handleChangePeriod}
            >
              <Tabs.List theme="light" className="w-full md:!w-max">
                <Tabs.Trigger value="last12months" className="flex-1 min-w-max">
                  Últimos 12 meses
                </Tabs.Trigger>
                <Tabs.Trigger value="last30days" className="flex-1 min-w-max">
                  Últimos 30 dias
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
          </div>
          <Separator className="my-4" />
          <ResponsiveContainer
            width="100%"
            height={300}
            className="py-6 flex-1 min-h-[300px]"
          >
            <BarChart
              data={periods}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#96a3af44" />
              <XAxis dataKey="name" stroke="#96a3af" fontSize={12} />
              <Tooltip cursor={false} content={<CustomTooltip />} />
              <Bar
                dataKey="inflow"
                stackId="a"
                className="fill-success-400 opacity-80"
                barSize={40}
              />
              <Bar
                dataKey="outflow"
                stackId="a"
                className="fill-failure-400 opacity-80"
                barSize={40}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
