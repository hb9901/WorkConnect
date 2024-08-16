//삭제 필요
import { create } from 'zustand';

interface scrollYState {
  scrollY: number;
  setScrollY: (newScrollY: number) => void;
}

const useScrollYStore = create<scrollYState>((set) => ({
  scrollY: 0,
  setScrollY: (newScrollY: number) =>
    set({
      scrollY: newScrollY
    })
}));

export default useScrollYStore;
