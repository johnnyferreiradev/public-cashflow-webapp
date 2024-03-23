'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextThemeProvider attribute="class">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </NextThemeProvider>
    </SessionProvider>
  );
}
