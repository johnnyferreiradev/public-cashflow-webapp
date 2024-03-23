'use client';

import { formatCurrency } from '@/utils/currency';
import { cn } from '@/utils/cn';

import CurrentCashflowCard from '@/components/modules/cashflow/CurrentCashflowCard';
import Card from '@/components/ui/Card';
import LastCashflowCard from '@/components/modules/cashflow/LastCashflowCard';
import { PageWithInfo } from '@/components/modules/general/PageWithInfo';

import InflowOutflowChart from './components/InflowOutflowChart';
import LastTransactionsTable from './components/LastTransactionsTable';
import TotalCard from './components/TotalCard';

import welcomeIllustration from '@/assets/images/welcome.svg';

import { useDashboard } from './hook';
import { Button, Image } from 'nemea-ui';
import { APP_NAME } from '@/settings';
import { Plus } from '@phosphor-icons/react';
import CashflowFormModal from '@/components/modules/cashflow/CashflowFormModal';
import DashboardLoading from './components/DashboardLoading';

export default function Dashboard() {
  const {
    data,
    isError,
    isLoading,
    balanceStatus,
    hasActiveCashFlow,
    activeCashFlowIsLoading,
    cashflow,
  } = useDashboard();

  if (activeCashFlowIsLoading) return <DashboardLoading />;

  return (
    <PageWithInfo.Root>
      <PageWithInfo.Main>
        {!activeCashFlowIsLoading && hasActiveCashFlow && (
          <>
            <div className="mb-4 md:!mb-12 flex items-center justify-between gap-16">
              <div className="">
                <h2 className="font-bold text-xl md:!text-2xl mb-1 pl-4">
                  Bem-vindo ao seu Painel Financeiro!
                </h2>
                <p className="text-base text-gray-400 hidden md:!block pl-4">
                  Este é o seu centro de controle financeiro, projetado para
                  ajudá-lo a tomar decisões inteligentes e ficar no comando das
                  suas finanças.
                </p>
              </div>
              <span></span>
            </div>
            <CurrentCashflowCard
              description="Continue a cuidar das finanças de hoje"
              status="closed"
              className="mb-6 md:!mb-8 block lg:!hidden"
            />

            <div className="w-full flex items-start gap-6 flex-wrap">
              <TotalCard
                title="Saldo inicial"
                description="Valor inicial do caixa"
                status="start"
                total={data ? formatCurrency(data.opening_balance) : ''}
                isLoading={isLoading}
                isError={isError}
              />
              <TotalCard
                title="Entradas de Caixa (Receitas)"
                description="Total de receitas"
                status="positive"
                total={data ? formatCurrency(data.total_inflow) : ''}
                isLoading={isLoading}
                isError={isError}
              />
              <TotalCard
                title="Saídas de Caixa (Despesas)"
                description="Total de despesas"
                status="negative"
                total={data ? formatCurrency(data.total_outflow) : ''}
                isLoading={isLoading}
                isError={isError}
              />
              <TotalCard
                title="Saldo Final"
                description="Receitas - despesas + saldo inicial"
                status={balanceStatus as 'equal' | 'negative' | 'positive'}
                total={data ? formatCurrency(data.balance) : ''}
                isLoading={isLoading}
                isError={isError}
              />
            </div>
            <Card className="w-full mt-6 md:!mt-8">
              <InflowOutflowChart />
            </Card>
            <Card className="w-full mt-6 md:!mt-8">
              <LastTransactionsTable />
            </Card>
          </>
        )}

        {cashflow.isOpen && (
          <CashflowFormModal
            onClose={() => {
              cashflow.handleClose();
            }}
            onSave={() => cashflow.handleSave()}
            open={cashflow.isOpen}
            defaultActive
          />
        )}

        {!activeCashFlowIsLoading && !hasActiveCashFlow && (
          <div className="w-full flex justify-center flex-1">
            <div
              className={cn(
                'h-screen w-full max-w-sm md:!max-w-5xl flex items-center justify-between gap-8 pb-32',
                'flex-col-reverse md:!flex-row px-4 md:!px-16',
                'ml-0 md:!ml-64',
              )}
            >
              <div
                className={cn(
                  'w-full flex flex-col gap-4 animate-logo-fade-in justify-center md:!justify-start',
                  'items-center md:!items-start',
                )}
              >
                <h1 className="text-center md:!text-start text-2xl md:!text-3xl font-bold w-full max-w-md leading-10 tracking-tight">
                  Bem-vindo ao módulo de{' '}
                  <span className="text-primary-600 dark:text-primary-400">
                    Fluxo de Caixa
                  </span>{' '}
                  do{' '}
                  <span className="text-primary-600 dark:text-primary-400">
                    {APP_NAME}
                  </span>
                  !
                </h1>
                <p className="text-base md:!text-lg text-center md:!text-start max-w-sm">
                  Estamos empolgados em tê-lo conosco. Sua jornada para um
                  futuro financeiro mais sólido começa aqui. Crie um novo caixa
                  para iniciar.
                </p>
                <Button.Root
                  size="md"
                  theme="primary"
                  className="mt-16 w-max"
                  onClick={() => cashflow.handleOpen()}
                >
                  <Button.Icon>
                    <Plus size={24} />
                  </Button.Icon>
                  <Button.Label>Novo caixa</Button.Label>
                </Button.Root>
              </div>
              <Image
                src={welcomeIllustration.src}
                alt="Welcome image"
                className="w-full max-w-[180px] md:!max-w-[200px] animate-logo-fade-in delay-200 mt-8"
              />
            </div>
          </div>
        )}
      </PageWithInfo.Main>
      {!activeCashFlowIsLoading && hasActiveCashFlow && (
        <PageWithInfo.InfoSection>
          <CurrentCashflowCard
            description="Continue a cuidar das finanças de hoje"
            status="closed"
          />
          <LastCashflowCard />
        </PageWithInfo.InfoSection>
      )}
    </PageWithInfo.Root>
  );
}
