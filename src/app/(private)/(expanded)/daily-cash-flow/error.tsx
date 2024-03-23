'use client';

import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-screen flex items-center justify-center">
      <ClientErrorBoundary
        title="Ops! Algo de errado aconteceu."
        subtitle="Tente novamente mais tarde ou contate o suporte."
        onRetry={() => reset()}
      />
    </div>
  );
}
