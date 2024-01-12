import { getItem, setItem } from '@/utils/localStorage';
import { create } from 'zustand';

interface NavbarState {
  isOpen: boolean;
}

export interface NavbarStore extends NavbarState {
  setOpen: (args: NavbarState['isOpen']) => void;
}

const initialState: Pick<NavbarStore, keyof NavbarState> = {
  isOpen: getItem('isOpen') ?? true,
};

const useNavbarStore = create<NavbarStore>((set) => ({
  ...initialState,
  setOpen: (isOpen) => {
    setItem('isOpen', isOpen);
    set(() => ({ isOpen }));
  },
}));
export default useNavbarStore;
