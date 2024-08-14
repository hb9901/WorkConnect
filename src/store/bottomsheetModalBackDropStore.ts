import { create } from 'zustand';

interface bottomsheetModalBackDropState {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
}

const useBottomsheetModalBackDropStore = create<bottomsheetModalBackDropState>((set) => ({
  isOpen: false,
  setOpen: () =>
    set({
      isOpen: true
    }),
  setClose: () =>
    set({
      isOpen: false
    })
}));

export default useBottomsheetModalBackDropStore;
