import { useMemo, useState } from 'react';

export const useTransactionsDateControl = ({
  onChange,
  initialValue,
}: {
  onChange?: (date: Date) => void;
  initialValue?: Date;
}) => {
  const TODAY = useMemo(() => new Date(), []);

  const [currentDate, setCurrentDate] = useState(initialValue || TODAY);

  const handleBackToToday = () => {
    setCurrentDate(TODAY);
    onChange?.(TODAY);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
    onChange?.(newDate);
  };

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
    onChange?.(newDate);
  };

  const isToday = useMemo(() => {
    const todayDate = new Date(TODAY);
    const selectedDate = new Date(currentDate);
    todayDate.setUTCHours(0, 0, 0, 0);
    selectedDate.setUTCHours(0, 0, 0, 0);
    return todayDate.getTime() === selectedDate.getTime();
  }, [TODAY, currentDate]);

  const handleCalendarSelect = (date: Date) => {
    setCurrentDate(date);
    onChange?.(date);
  };

  return {
    currentDate,
    isToday,
    handleBackToToday,
    handleNext,
    handlePrevious,
    handleCalendarSelect,
  };
};
