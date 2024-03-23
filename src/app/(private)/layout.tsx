'use client';

import { useEffect } from 'react';
import { Toaster } from 'nemea-ui';
import { useQuery } from '@tanstack/react-query';
import { Crisp } from 'crisp-sdk-web';

import { CRISP_WEBSITE_ID } from '../../settings';

import useAuthorized, { CustomSession } from '@/hooks/useAuthorized';

import { useToasterNotificationStore } from '@/store/toasterNotificationStore';
import { useUserStore } from '@/store/userStore';
import { useCashFlowStore } from '@/store/cashFlowStore';
import { ActiveCashFlowResponse } from '@/services/cashflow/cashFlow/types';

import { showActiveCashFlow } from '@/services/cashflow/cashFlow';

import 'nemea-ui/styles.css';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useAuthorized();
  const setCompany = useUserStore((state) => state.setCompany);
  const setUserData = useUserStore((state) => state.setUserData);

  const company = (session as CustomSession)?.user.company;
  const user = (session as CustomSession)?.user.user;

  useEffect(() => {
    if (company) {
      setCompany({
        id: company.id,
        name: company.name,
        firstAccess: company.first_access,
      });
    }

    if (user) {
      setUserData({
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
      });
    }
  }, [company, setCompany, setUserData, user]);

  const { notifications, hideNotification } = useToasterNotificationStore(
    (state) => state,
  );
  const { setActiveCashFlow, setActiveCashFlowError } = useCashFlowStore(
    (state) => state,
  );

  const { data, isError, refetch } = useQuery<ActiveCashFlowResponse>({
    queryKey: ['active-cash-flow'],
    queryFn: showActiveCashFlow,
    enabled: !!company,
  });

  useEffect(() => {
    if (data) {
      setActiveCashFlow({
        data: {
          balance: data?.balance || '0',
          createdAt: data?.created_at || '',
          description: data?.description || '',
          id: data?.id || '',
          openingBalance: data?.opening_balance || '0',
          totalInflow: data?.total_inflow || '0',
          totalOutflow: data?.total_outflow || '0',
          updatedAt: data?.updated_at || '',
        },
        hasActive: Object.keys(data || {}).length > 0,
        isError: false,
        isLoading: false,
        refetch: () => refetch(),
      });
      return;
    }

    if (isError) {
      setActiveCashFlowError(true, () => refetch());
    }
  }, [data, setActiveCashFlow, isError, setActiveCashFlowError, refetch]);

  useEffect(() => {
    if (CRISP_WEBSITE_ID) {
      Crisp.configure(CRISP_WEBSITE_ID, {
        autoload: false,
      });
      Crisp.load();
    }
  }, []);

  return (
    <>
      {notifications.map((notification) => (
        <Toaster.Root
          defaultOpen={notification.open}
          onOpenChange={(open) => {
            if (!open) {
              hideNotification(notification.id);
            }
          }}
          key={notification.id}
          className={notification.className}
          duration={notification.duration}
          position={notification.position}
          theme={notification.theme}
        >
          {notification.icon && (
            <Toaster.Icon>{notification.icon}</Toaster.Icon>
          )}
          {(notification.title || notification.description) && (
            <Toaster.Content>
              {notification.title && (
                <Toaster.Title>{notification.title}</Toaster.Title>
              )}
              {notification.description && (
                <Toaster.Description>
                  {notification.description}
                </Toaster.Description>
              )}
            </Toaster.Content>
          )}
          {notification.actions && notification.actions.length > 0 && (
            <Toaster.Actions>
              {notification.actions.map((action, index) => (
                <Toaster.Action
                  key={index}
                  altText={action.altText}
                  onClick={action.onClick}
                  className={action.className}
                >
                  {action.content}
                </Toaster.Action>
              ))}
            </Toaster.Actions>
          )}
          {notification.showCloseButton && <Toaster.Close />}
        </Toaster.Root>
      ))}
      {children}
    </>
  );
}
