import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from './providers';
import GoogleAnalytics from '@/components/ui/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CashFlow',
  description: 'Gestão financeira de forma simples',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <GoogleAnalytics
            googleAnalyticsId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}
          />
        )}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
