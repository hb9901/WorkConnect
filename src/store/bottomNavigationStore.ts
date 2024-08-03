import { create } from 'zustand';

interface TBottomNavigationState {
  bottomIndex: number;
  setBottomIndex: (index: number) => void;
}

const useBottomNavigationStore = create<TBottomNavigationState>((set) => ({
  bottomIndex: 0,
  setBottomIndex: (index) => {
    set({ bottomIndex: index });
  }
}));

export default useBottomNavigationStore;
