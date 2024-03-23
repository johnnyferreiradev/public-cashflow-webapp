'use client';

import { useUserStore } from '@/store/userStore';

const useAuthUser = () => {
  const userState = useUserStore((state) => state);
  return userState;
};

export default useAuthUser;
