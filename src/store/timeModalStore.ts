import { create } from 'zustand';

interface TuseTimeModalStoreState {
  isTimeModalOpen: boolean;
  startTime: string;
  endTime: string;
  setTimeModalOpen: () => void;
  setTimeModalClose: () => void;
  setStartTime: (time: any) => void;
  setEndTime: (time: any) => void;
}

const useTimeModalStore = create<TuseTimeModalStoreState>((set) => ({
  isTimeModalOpen: false,
  startTime: '',
  endTime: '',
  setTimeModalOpen: () => {
    set({ isTimeModalOpen: true });
  },
  setTimeModalClose: () => {
    set({ isTimeModalOpen: false });
  },
  setStartTime: (time: any) => {
    set({ startTime: time });
  },
  setEndTime: (time: any) => {
    set({ endTime: time });
  }
}));

export default useTimeModalStore;
