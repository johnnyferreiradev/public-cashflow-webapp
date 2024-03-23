'use client';

import { Toaster } from 'nemea-ui';

import { useToasterNotificationStore } from '@/store/toasterNotificationStore';

import 'nemea-ui/styles.css';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { notifications, hideNotification } = useToasterNotificationStore(
    (state) => state,
  );

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
