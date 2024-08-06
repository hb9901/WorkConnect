'use client';
import Typography from '@/components/Typography';
import useDateStore from '@/store/dateStore';
import { cva } from 'class-variance-authority';
import { getWeekDates } from './function';

const WeekDate = () => {
  const weekNames = ['일', '월', '화', '수', '목', '금', '토'];
  const { selectedDate, handleClickDate } = useDateStore();
  const weekDates = getWeekDates(selectedDate);

  return (
    <div className="flex flex-row justify-between items-center mt-[30px] mb-8px">
      {weekDates.map((date, index) => (
        <div className="flex flex-col gap-[16px] items-center" key={date.date()}>
          <Typography variant="Title14px" color="grey600">
            {weekNames[index]}
          </Typography>

          <Typography variant="Body14px" color="grey700Black">
            <button
              className={buttonVariants({
                isSelected: selectedDate.month() === date.month() && selectedDate.date() === date.date()
              })}
              onClick={() => handleClickDate(date)}
            >
              {date.date()}
            </button>
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default WeekDate;

const buttonVariants = cva('w-7 h-7 rounded-full', {
  variants: {
    isSelected: {
      true: 'bg-[#7173FA] text-white',
      false: ' '
    }
  },
  defaultVariants: {
    isSelected: false
  }
});
