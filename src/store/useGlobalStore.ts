import { getItem, setItem } from '@/utils/localStorage';
import { create } from 'zustand';

interface GlobalState {
  isMenuOpen: boolean;
}

export interface GlobalStore extends GlobalState {
  toggleMenu: (args: GlobalState['isMenuOpen']) => void;
}

const initialState: Pick<GlobalStore, keyof GlobalState> = {
  isMenuOpen: getItem('isMenuOpen') ?? true,
};

const useNavbarStore = create<GlobalStore>((set) => ({
  ...initialState,
  toggleMenu: (isMenuOpen) => {
    setItem('isMenuOpen', isMenuOpen);
    set(() => ({ isMenuOpen }));
  },
}));
export default useNavbarStore;
