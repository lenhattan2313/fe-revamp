import { getItem, setItem } from '@/utils/localStorage';
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
}

export interface AuthStore extends AuthState {
  setIsAuthenticated: (args: AuthState['isAuthenticated']) => void;
}

const initialState: Pick<AuthStore, keyof AuthState> = {
  isAuthenticated: getItem('isAuthenticated') || false,
};

const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  setIsAuthenticated: (isAuthenticated) => {
    setItem('isAuthenticated', isAuthenticated);
    set(() => ({ isAuthenticated }));
  },
}));
export default useAuthStore;
