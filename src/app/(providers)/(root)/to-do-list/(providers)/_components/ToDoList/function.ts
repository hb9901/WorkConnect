import { Dayjs } from "dayjs";

const changeDateStr = (start: string, end: string): string => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return `${startDate.getHours()}:${startDate.getMinutes()} ~ ${endDate.getHours()}:${endDate.getMinutes()}`;
};

const isDateSelected = (
  start: string,
  end: string,
  selectedDate: Dayjs
): boolean => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const year = selectedDate.year();
  const month = selectedDate.month();
  const day = selectedDate.date();

  const isSelectedDateSameStartDate =
    startDate.getFullYear() === year &&
    startDate.getMonth() === month &&
    startDate.getDate() === day;
  const isSelectedDateSameEndDate =
    endDate.getFullYear() === year &&
    endDate.getMonth() === month &&
    endDate.getDate() === day;
  return isSelectedDateSameStartDate && isSelectedDateSameEndDate;
};

export { changeDateStr, isDateSelected };
