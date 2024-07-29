import { create } from 'zustand';

interface TuseTimeModalStoreState {
  isTimeModalOpen: boolean;
  isStartTime: boolean;
  startTime: string;
  endTime: string;
  setTimeModalOpen: () => void;
  setTimeModalClose: () => void;
  setStart: () => void;
  setEnd: () => void;
  setStartTime: (time: any) => void;
  setEndTime: (time: any) => void;
}

const useTimeModalStore = create<TuseTimeModalStoreState>((set) => ({
  isTimeModalOpen: false,
  isStartTime: true,
  startTime: '',
  endTime: '',
  setTimeModalOpen: () => {
    set({ isTimeModalOpen: true });
  },
  setTimeModalClose: () => {
    set({ isTimeModalOpen: false });
  },
  setStart: () => {
    set({ isStartTime: true });
  },
  setEnd: () => {
    set({ isStartTime: false });
  },
  setStartTime: (time: any) => {
    set({ startTime: time });
  },
  setEndTime: (time: any) => {
    set({ endTime: time });
  }
}));

export default useTimeModalStore;
