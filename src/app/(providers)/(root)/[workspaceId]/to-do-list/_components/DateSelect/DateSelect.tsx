'use client';
import useDateStore from '@/store/dateStore';
import DateButtons from '../DateButtons';
import MonthDate from '../MonthDate';
import WeekDate from '../WeekDate';

const DateSelect = () => {
  const isWeekly = useDateStore((state) => state.isWeekly);

  return (
    <div>
      <DateButtons />
      {isWeekly ? <WeekDate /> : <MonthDate />}
    </div>
  );
};

export default DateSelect;
