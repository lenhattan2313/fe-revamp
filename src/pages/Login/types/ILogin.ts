export type IFormLoginData = {
  userName: string;
  password: string;
};
export type AuthToken = {
  token: string;
  refreshToken: string;
};

export type Profile = {
  userId: string;
  userName: string;
  displayName: string;
  email: string;
  roles: string[];
};
