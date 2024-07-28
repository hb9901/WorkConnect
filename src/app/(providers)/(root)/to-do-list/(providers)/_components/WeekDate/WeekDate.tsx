'use client';
import useDateStore from '@/store/dateStore';
import { cva } from 'class-variance-authority';
import { getWeekDates } from './function';

const WeekDate = () => {
  const weekNames = ['일', '월', '화', '수', '목', '금', '토'];
  const { selectedDate, handleClickDate } = useDateStore();
  const weekDates = getWeekDates(selectedDate);

  return (
    <div className="flex flex-row justify-between">
      {weekDates.map((date, index) => (
        <div className="flex flex-col items-center gap-2" key={date.date()}>
          <div>{weekNames[index]}</div>
          <div>
            <button
              className={buttonVariants({
                isSelected: selectedDate.month() === date.month() && selectedDate.date() === date.date()
              })}
              onClick={() => handleClickDate(date)}
            >
              {date.date()}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekDate;

const buttonVariants = cva('w-7 h-7 rounded-full', {
  variants: {
    isSelected: {
      true: 'bg-black text-white',
      false: ' '
    }
  },
  defaultVariants: {
    isSelected: false
  }
});
