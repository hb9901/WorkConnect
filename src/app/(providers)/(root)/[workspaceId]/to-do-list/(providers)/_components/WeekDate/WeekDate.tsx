'use client';
import useDateStore from '@/store/dateStore';
import MobileDate from '../MobileDate';
import PcDate from '../PcDate';
import { getWeekDates } from './function';

const WeekDate = () => {
  const weekNames = ['일', '월', '화', '수', '목', '금', '토'];
  const selectedDate = useDateStore((state) => state.selectedDate);
  const weekDates = getWeekDates(selectedDate);

  return (
    <div className="flex flex-row justify-between items-center mt-[30px] mb-8px lg:flex-col lg:mt-0">
      {weekDates.map((date, index) => (
        <div className="w-full" key={date.date()}>
          <MobileDate
            weekName={weekNames[index]}
            date={date}
            isSelected={selectedDate.month() === date.month() && selectedDate.date() === date.date()}
          />
          <PcDate
            weekName={weekNames[index]}
            date={date}
            isSelected={selectedDate.month() === date.month() && selectedDate.date() === date.date()}
          />
        </div>
      ))}
    </div>
  );
};

export default WeekDate;
