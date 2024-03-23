import { format, parseISO, getYear, subMonths, subDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const getYearFromAPIDate = (APIDate: string) => {
  const date = parseISO(APIDate);
  return getYear(date);
};

export const getMonthAndYearFromAPIDate = (APIDate: string) => {
  const date = parseISO(APIDate);
  // eslint-disable-next-line quotes
  const monthAndYearFormatted = format(date, "MMMM 'de' yyyy", {
    locale: ptBR,
  });
  return monthAndYearFormatted;
};

export const getCurrentMonthAndYearDate = () => {
  // eslint-disable-next-line quotes
  const monthAndYearFormatted = format(Date.now(), "MMMM 'de' yyyy", {
    locale: ptBR,
  });
  return monthAndYearFormatted;
};

export const getDateInSlashFormat = (APIDate: string) => {
  const date = parseISO(APIDate);
  const formattedDate = format(date, 'dd/MM/yyyy');
  return formattedDate;
};

export const getDateAndTimeInSlashFormat = (APIDate: string) => {
  const date = parseISO(APIDate);
  // eslint-disable-next-line quotes
  const formattedDate = format(date, "dd/MM/yyyy 'às' HH:mm");
  return formattedDate;
};

export const getLongLocalizedDate = (
  date: number,
  dateFormat?: 'P' | 'PP' | 'PPP' | 'PPPP',
) => {
  return format(date, dateFormat || 'PPP', {
    locale: ptBR,
  });
};

export const getLastXMonthsDate = (monthsAgo: number) => {
  const currentDate = new Date();
  const targetDate = subMonths(currentDate, monthsAgo);
  // eslint-disable-next-line quotes
  const dateFormat = "MMMM 'de' yyyy";
  const formattedDate = format(targetDate, dateFormat, {
    locale: ptBR,
  });
  return formattedDate;
};

export const getLastXDaysDate = (x: number) => {
  const currentDate = new Date();
  const targetDate = subDays(currentDate, x);
  const dateFormat = 'd/MMM';
  const formattedDate = format(targetDate, dateFormat, {
    locale: ptBR,
  });
  return formattedDate;
};

export const getCurrentDayAndMonth = () => {
  const currentDate = new Date();
  const dateFormat = 'd/MMM';
  const formattedDate = format(currentDate, dateFormat, {
    locale: ptBR,
  });
  return formattedDate;
};
