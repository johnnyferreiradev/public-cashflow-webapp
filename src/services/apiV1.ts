import axios from 'axios';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

interface CustomSession extends Omit<Session, 'user'> {
  user: {
    access: string;
  };
}

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL + '/v1';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  const {
    user: { access },
  } = session as CustomSession;

  if (access) {
    config.headers['Authorization'] = `Bearer ${access}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.code === 'token_not_valid') {
      signOut({ callbackUrl: '/login', redirect: true });
    }
  },
);

export default api;
