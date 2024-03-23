export interface ClientErrorBoundaryProps {
  className?: string;
  id?: string;
  title: string;
  subtitle?: string;
  onRetry?: () => void;
  hideImage?: boolean;
}
