import { APP_SLUG } from '@/settings';

export const setCashFlowCardType = (value: 'open' | 'continue' | 'stop') => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`@${APP_SLUG}/cash-flow-card-type`, value);
  }
};

export const getCashFlowCardType = (): 'open' | 'continue' | 'stop' | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(`@${APP_SLUG}/cash-flow-card-type`) as
      | 'open'
      | 'continue'
      | 'stop';
  }
  return null;
};

export const setLastOperationDate = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(
      `@${APP_SLUG}/last-operation-date`,
      new Date().toLocaleDateString(),
    );
  }
};

export const getLastOperationDate = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(`@${APP_SLUG}/last-operation-date`);
  }
  return null;
};
