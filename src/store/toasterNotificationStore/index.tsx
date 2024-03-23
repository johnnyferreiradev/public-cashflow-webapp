import { create } from 'zustand';

import { ToasterNotificationState, ToasterNotification } from './types';

export const useToasterNotificationStore = create<ToasterNotificationState>(
  (set) => ({
    notifications: [],
    showNotification: (notification: Omit<ToasterNotification, 'open'>) =>
      set((state) => {
        return {
          ...state,
          notifications: !state.notifications.some(
            (currentNotification) => currentNotification.id === notification.id,
          )
            ? [...state.notifications, { ...notification, open: true }]
            : state.notifications,
        };
      }),
    hideNotification: (id: string) => {
      set((state) => {
        const foundedIndex = state.notifications.findIndex(
          (notification) => notification.id === id,
        );
        const updatedNotifications = state.notifications.map(
          (notification, index) => {
            if (index === foundedIndex) {
              return { ...notification, open: false };
            }
            return notification;
          },
        );

        return {
          ...state,
          notifications: updatedNotifications,
        };
      });

      setTimeout(() => {
        set((state) => {
          return {
            ...state,
            notifications: [
              ...state.notifications.filter(
                (notification) => notification.id !== id,
              ),
            ],
          };
        });
      }, 400);
    },
  }),
);
