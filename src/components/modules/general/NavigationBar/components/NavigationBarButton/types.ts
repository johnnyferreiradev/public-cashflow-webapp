export interface NavigationBarButtonProps {
  className?: string;
  id?: string;
  title?: string;
  icon: React.ReactNode;
  href?: string;
  active: boolean;
  onClick?: () => void;
  disabled?: boolean;
}
