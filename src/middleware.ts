export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/daily-cash-flow',
    '/cash-flow-list',
    '/categories',
  ],
};
