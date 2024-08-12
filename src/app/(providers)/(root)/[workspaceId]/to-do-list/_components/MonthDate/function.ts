import { Dayjs } from 'dayjs';

const getMonthDates = (selectedDate: Dayjs) => {
  const startOfMonth = selectedDate.startOf('month');
  const startDayOfMonth = startOfMonth.day() - 1;
  const startOfCalendar = startOfMonth.set('date', -startDayOfMonth);
  const endOfCalendarMonth = startOfCalendar.add(35, 'day').month();
  const monthArrLength = endOfCalendarMonth === selectedDate.month() ? 42 : 35;
  const monthArr = Array.from({ length: monthArrLength }, (_, index) => startOfCalendar.add(index, 'day'));
  return monthArr;
};

export { getMonthDates };
