export type IFormLoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  shop: Shop;
  token: AuthToken;
};

export type RefreshResponse = {
  user: Shop;
  token: AuthToken;
};

export type Shop = {
  email: string;
  _id: string;
};

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
};

export type Profile = {
  userId: string;
  displayName: string;
  email: string;
  roles: string[];
};
