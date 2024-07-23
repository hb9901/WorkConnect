import { Dayjs } from "dayjs";

const getWeekDates = (selectedDate: Dayjs) => {
  const startOfWeek = selectedDate.startOf("week");
  const weekArr = Array.from({ length: 7 }, (_, index) =>
    startOfWeek.add(index, "day")
  );
  return weekArr;
};

export { getWeekDates };
