import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

import { cn } from '@/utils/cn';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div
      className={cn('h-screen w-screen bg-grayscale-50 dark:bg-grayscale-950')}
    >
      {children}
    </div>
  );
}
