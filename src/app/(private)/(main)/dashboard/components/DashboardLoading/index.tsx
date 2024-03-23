import { cn } from '@/utils/cn';

import TotalCardLoading from '../TotalCard/components/TotalCardLoading';
import InflowOutflowChartLoading from '../InflowOutflowChart/components/InflowOutflowChartLoading';
import CurrentCashFlowCardLoading from '@/components/modules/cashflow/CurrentCashflowCard/components/CurrentCashFlowCardLoading';
import LastCashFlowCardLoading from '@/components/modules/cashflow/LastCashflowCard/components/LastCashFlowCardLoading';
import { PageWithInfo } from '@/components/modules/general/PageWithInfo';
import Card from '@/components/ui/Card';

import { DashboardLoadingProps } from './types';
import { Skeleton } from 'nemea-ui';
import { LastTransactionsTableLoading } from '../LastTransactionsTable/components/LastTransactionsTableLoading';

export default function DashboardLoading({
  className = '',
  id,
}: DashboardLoadingProps) {
  return (
    <PageWithInfo.Root className={cn('w-full', className)} id={id}>
      <PageWithInfo.Main>
        <div className="mb-4 md:!mb-12 flex items-center justify-between gap-16">
          <div className="w-full">
            <Skeleton width="30%" height="20px" className="mb-2" />
            <Skeleton width="50%" height="16px" className="mb-1" />
            <Skeleton width="40%" height="16px" />
          </div>
          <span></span>
        </div>

        <div className="w-full flex items-start gap-6 flex-wrap">
          <Card className={cn('flex-1 min-w-[288px] min-h-[160px]')}>
            <TotalCardLoading />
          </Card>
          <Card className={cn('flex-1 min-w-[288px] min-h-[160px]')}>
            <TotalCardLoading />
          </Card>
          <Card className={cn('flex-1 min-w-[288px] min-h-[160px]')}>
            <TotalCardLoading />
          </Card>
        </div>
        <Card className="w-full mt-6 md:!mt-8">
          <InflowOutflowChartLoading />
        </Card>
        <Card className="w-full mt-6 md:!mt-8">
          <LastTransactionsTableLoading />
        </Card>
      </PageWithInfo.Main>
      <PageWithInfo.InfoSection>
        <Card>
          <CurrentCashFlowCardLoading />
        </Card>
        <Card>
          <LastCashFlowCardLoading />
        </Card>
      </PageWithInfo.InfoSection>
    </PageWithInfo.Root>
  );
}
