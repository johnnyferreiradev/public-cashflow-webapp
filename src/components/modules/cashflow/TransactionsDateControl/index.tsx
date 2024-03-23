import { cn } from '@/utils/cn';
import ptBR from 'date-fns/locale/pt-BR';

import Card from '@/components/ui/Card';

import { TransactionsDateControlProps } from './types';
import { Button, Calendar, Dropdown } from 'nemea-ui';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useTransactionsDateControl } from './hook';
import { getLongLocalizedDate } from '@/utils/date';

export default function TransactionsDateControl({
  className = '',
  id,
  initialValue,
  onChange,
}: TransactionsDateControlProps) {
  const {
    currentDate,
    isToday,
    handleBackToToday,
    handleNext,
    handlePrevious,
    handleCalendarSelect,
  } = useTransactionsDateControl({
    initialValue,
    onChange,
  });

  return (
    <Card className={cn(className)} id={id}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-grayscale-400">Transações do dia</p>
        {!isToday && (
          <Button.Root
            theme="linkPrimary"
            size="sm"
            className="pr-0 py-0"
            onClick={handleBackToToday}
          >
            <Button.Label className="mx-0.5 text-base">Hoje</Button.Label>
          </Button.Root>
        )}
      </div>
      <div className="flex items-center justify-between my-2 gap-2">
        <Button.Root
          theme="grayPrimary"
          size="sm"
          className="p-1.5"
          onClick={handlePrevious}
        >
          <Button.Icon>
            <CaretLeft size={20} weight="bold" />
          </Button.Icon>
        </Button.Root>
        <Dropdown.Root
          className="w-full flex-1 z-20"
          trigger={
            <Button.Root theme="darkFlat" size="sm" className="p-0.5" asChild>
              <Button.Label className="text-lg font-bold min-w-full px-0 mx-0">
                {getLongLocalizedDate(currentDate.getTime())}
              </Button.Label>
            </Button.Root>
          }
        >
          <div className="">
            <Calendar
              locale={ptBR}
              selected={currentDate}
              onSelect={(date) => {
                if (date) {
                  handleCalendarSelect(date);
                }
              }}
              mode="single"
            />
          </div>
        </Dropdown.Root>
        <Button.Root
          theme="grayPrimary"
          size="sm"
          className="p-1.5"
          onClick={handleNext}
        >
          <Button.Icon>
            <CaretRight size={20} weight="bold" />
          </Button.Icon>
        </Button.Root>
      </div>
    </Card>
  );
}
