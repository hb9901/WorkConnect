import { create } from 'zustand';

interface bottomsheetModalBackDropState {
  isOpen: boolean;
  handleOpen: () => void;
  setOpen: () => void;
  setClose: () => void;
}

const useBottomsheetModalBackDropStore = create<bottomsheetModalBackDropState>((set, get) => ({
  isOpen: false,
  handleOpen: () =>
    set({
      isOpen: !get().isOpen
    }),
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
