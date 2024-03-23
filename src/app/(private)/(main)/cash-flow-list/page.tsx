'use client';

import { useCashFlowStore } from '@/store/cashFlowStore';
import CashFlowListTable from './components/CashFlowListTable';
import CurrentCashflowBanner from './components/CurrentCashflowBanner';

import { cn } from '@/utils/cn';

export default function CashFlowList() {
  const {
    data: { id: cashFlowId },
  } = useCashFlowStore((state) => state.activeCashFlow);

  return (
    <div
      className={cn(
        'w-full flex-1 max-h-[calc(100%-64px)] flex flex-col gap-6 md:!gap-8 overflow-y-auto default-scroll',
        'px-3 md:!px-8 pt-6 md:!py-8 pb-24',
      )}
    >
      {cashFlowId && <CurrentCashflowBanner />}
      <CashFlowListTable />
    </div>
  );
}
