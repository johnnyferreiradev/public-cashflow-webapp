'use client';

import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Session } from 'next-auth';

export interface CustomSession extends Session {
  error?: string;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    access: string;
    refresh: string;
    company: {
      id: string;
      name: string;
      first_access: boolean;
    };
    user: {
      username: string;
      email: string;
      first_name: string;
      last_name: string;
    };
  };
}

const useAuthorized = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if ((session as CustomSession)?.error === 'RefreshAccessTokenError') {
      signOut();
    }
  }, [session]);

  return { session };
};

export default useAuthorized;
