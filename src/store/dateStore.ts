import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';

interface TDateState {
  isWeekly: boolean;
  selectedDate: Dayjs;
  changeIsWeekly: () => void;
  handleClickNext: () => void;
  handleClickPrevious: () => void;
  handleClickDate: (newDate: Dayjs) => void;
}

const useDateStore = create<TDateState>((set, get) => ({
  isWeekly: true,
  selectedDate: dayjs(),
  changeIsWeekly: () => {
    const prevIsWeekly = get().isWeekly;

    set({ isWeekly: !prevIsWeekly });
  },
  handleClickNext: () => {
    const selectedDate = get().selectedDate;
    const isWeekly = get().isWeekly;
    const newDate = isWeekly ? selectedDate.add(1, 'week') : selectedDate.add(1, 'month');

    set({ selectedDate: newDate });
  },
  handleClickPrevious: () => {
    const selectedDate = get().selectedDate;
    const isWeekly = get().isWeekly;
    const newDate = isWeekly ? selectedDate.add(-1, 'week') : selectedDate.add(-1, 'month');

    set({ selectedDate: newDate });
  },
  handleClickDate: (newDate: Dayjs) => {
    set({ selectedDate: newDate });
  }
}));

export default useDateStore;
