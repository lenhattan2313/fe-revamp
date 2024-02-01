import { StateCreator, create } from 'zustand';
import { PersistOptions, persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
  shopId: string;
}

export interface AuthStore extends AuthState {
  setAuthenticated: (args: AuthState) => void;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  accessToken: '',
  refreshToken: '',
  shopId: '',
};
type MyPersist = (
  config: StateCreator<AuthStore>,
  options: PersistOptions<AuthStore>,
) => StateCreator<AuthStore>;
const useAuthStore = create<AuthStore>(
  (persist as MyPersist)(
    (set) => ({
      ...initialAuthState,
      setAuthenticated: ({
        isAuthenticated,
        accessToken,
        refreshToken,
        shopId,
      }) => {
        set(() => ({ isAuthenticated, accessToken, refreshToken, shopId }));
      },
    }),
    {
      name: 'auth-store',
      // storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
export default useAuthStore;
