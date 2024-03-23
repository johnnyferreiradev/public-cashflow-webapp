import { create } from 'zustand';

import { UserState, UserCompanyState, UserData } from './types';

export const useUserStore = create<UserState>((set) => ({
  email: '',
  firstName: '',
  lastName: '',
  username: '',
  company: {
    id: '',
    name: '',
    firstAccess: false,
  },
  setCompany: (company: UserCompanyState) =>
    set((state) => ({ ...state, company })),
  setUserData: (userData: UserData) =>
    set((state) => ({
      ...state,
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    })),
}));
