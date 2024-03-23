'use client';

import CurrentCashflowCard from '@/components/modules/cashflow/CurrentCashflowCard';
import LastCashflowCard from '@/components/modules/cashflow/LastCashflowCard';
import { Button } from 'nemea-ui';
import { ArrowLeft } from '@phosphor-icons/react';
import Link from 'next/link';
import { PageWithInfo } from '@/components/modules/general/PageWithInfo';
import TransactionListTable from './components/TransactionListTable';
import TransactionsDateControl from '@/components/modules/cashflow/TransactionsDateControl';
import { getLongLocalizedDate } from '@/utils/date';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function DailyCashFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlDate = useMemo(() => searchParams.get('date'), [searchParams]);

  const dateArray = useMemo(() => {
    if (urlDate) {
      return urlDate.split('-').map((item) => parseInt(item));
    }
  }, [urlDate]);

  const handleChageDate = (date: Date) => {
    const currentDate = getLongLocalizedDate(date.getTime(), 'P');
    router.push(
      `/daily-cash-flow?date=${currentDate
        .split('/')
        .sort(() => -1)
        .join('-')}`,
    );
  };

  const isToday =
    !urlDate ||
    urlDate ===
      getLongLocalizedDate(new Date().getTime(), 'P')
        .split('/')
        .sort(() => -1)
        .join('-');

  const formattedDateMessage = urlDate
    ?.split('-')
    .sort(() => -1)
    .join('/');

  return (
    <PageWithInfo.Root>
      <PageWithInfo.Main>
        <div className="mb-4 md:!mb-12 flex items-center justify-between gap-16">
          <div className="pr-8">
            <Button.Root
              asChild
              className="w-max px-0 mb-2 md:!mb-4 ml-4"
              size="sm"
              theme="linkPrimary"
            >
              <Link href="/dashboard">
                <Button.Icon>
                  <ArrowLeft weight="bold" />
                </Button.Icon>
                <Button.Label>Painel financeiro</Button.Label>
              </Link>
            </Button.Root>
            <h2 className="font-bold text-xl md:!text-2xl mb-1 pl-4">
              Meu caixa
            </h2>
            <p className="text-base text-gray-400 hidden md:!block pl-4">
              Gerencie suas transações do dia.
            </p>
          </div>
          <span></span>
        </div>

        <CurrentCashflowCard
          status="opened"
          description="Este é o seu caixa de hoje"
          className="mb-6 md!mb-8 block lg:!hidden"
        />

        <TransactionsDateControl
          initialValue={
            dateArray
              ? new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
              : undefined
          }
          onChange={handleChageDate}
          className="mb-6 md!mb-8 block lg:!hidden"
        />

        <TransactionListTable isToday={isToday} />
      </PageWithInfo.Main>
      <PageWithInfo.InfoSection>
        <TransactionsDateControl
          initialValue={
            dateArray
              ? new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
              : undefined
          }
          onChange={handleChageDate}
        />
        <CurrentCashflowCard
          status="opened"
          description={
            !isToday
              ? `Seus resultados no dia ${formattedDateMessage}`
              : 'Seus resultados do dia'
          }
          hideDate
        />
        {isToday && <LastCashflowCard />}
      </PageWithInfo.InfoSection>
    </PageWithInfo.Root>
  );
}
