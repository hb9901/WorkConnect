import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";

interface TDateState {
  selectedDate: Dayjs;
  handleClickNextWeek: () => void;
  handleClickPreviousWeek: () => void;
  handleClickDate: (newDate: Dayjs) => void;
}

const useDateStore = create<TDateState>((set, get) => ({
  selectedDate: dayjs(),
  handleClickNextWeek: () => {
    const selectedDate = get().selectedDate;
    const newDate = selectedDate.add(1, "week");

    set({ selectedDate: newDate });
  },
  handleClickPreviousWeek: () => {
    const selectedDate = get().selectedDate;
    const newDate = selectedDate.add(-1, "week");

    set({ selectedDate: newDate });
  },
  handleClickDate: (newDate: Dayjs) => {
    set({ selectedDate: newDate });
  },
}));

export default useDateStore;
