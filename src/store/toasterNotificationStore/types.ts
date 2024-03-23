import { ToasterRootPositions, ToasterRootThemes } from 'nemea-ui';

interface ToasterAction {
  content: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  altText: string;
}

export interface ToasterNotification {
  id: string;
  open: boolean;
  className?: string;
  duration?: number;
  position?: keyof typeof ToasterRootPositions;
  theme?: keyof typeof ToasterRootThemes;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actions?: ToasterAction[];
  showCloseButton?: boolean;
}

export interface ToasterNotificationState {
  notifications: ToasterNotification[];
  showNotification: (notification: Omit<ToasterNotification, 'open'>) => void;
  hideNotification: (id: string) => void;
}
