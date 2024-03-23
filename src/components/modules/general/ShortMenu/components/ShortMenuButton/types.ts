export interface ShortMenuButtonProps {
  className?: string;
  id?: string;
  icon: React.ReactNode;
  href?: string;
  tooltipMessage?: string;
  active: boolean;
  onClick?: () => void;
  tooltipSide?: 'right' | 'top' | 'bottom' | 'left';
  disabled?: boolean;
  badge?: string;
}
