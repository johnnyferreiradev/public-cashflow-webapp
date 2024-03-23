export interface UserCompanyState {
  id: string;
  name: string;
  firstAccess: boolean;
}

export interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserState extends UserData {
  company: UserCompanyState;
  setCompany: (company: UserCompanyState) => void;
  setUserData: (userData: UserData) => void;
}
