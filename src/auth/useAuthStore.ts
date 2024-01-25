import { LOCAL_STORAGE_KEY } from '@/constants';
import { getItem, setItem } from '@/utils/localStorage';
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
  shopId: string;
}

export interface AuthStore extends AuthState {
  setAuthenticated: (args: AuthState) => void;
}

const initialState: AuthState = {
  isAuthenticated: getItem(LOCAL_STORAGE_KEY.IS_AUTHENTICATED) || false,
  accessToken: getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN) || '',
  refreshToken: getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN) || '',
  shopId: getItem(LOCAL_STORAGE_KEY.SHOP_ID) || '',
};

const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  setAuthenticated: ({
    isAuthenticated,
    accessToken,
    refreshToken,
    shopId,
  }) => {
    setItem(LOCAL_STORAGE_KEY.IS_AUTHENTICATED, isAuthenticated);
    setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
    setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
    setItem(LOCAL_STORAGE_KEY.SHOP_ID, shopId);
    set(() => ({ isAuthenticated, accessToken, refreshToken, shopId }));
  },
}));
export default useAuthStore;
