'use client';
import Typography from '@/components/Typography';
import useDateStore from '@/store/dateStore';
import DateButton from '../DateButton';
import { getWeekDates } from './function';

const WeekDate = () => {
  const weekNames = ['일', '월', '화', '수', '목', '금', '토'];
  const selectedDate = useDateStore((state) => state.selectedDate);
  const weekDates = getWeekDates(selectedDate);

  return (
    <div className="flex flex-row justify-between items-center mt-[30px] mb-8px">
      {weekDates.map((date, index) => (
        <div className="flex flex-col gap-[16px] items-center" key={date.date()}>
          <Typography variant="Title14px" color="grey600">
            {weekNames[index]}
          </Typography>
          <DateButton date={date} />
        </div>
      ))}
    </div>
  );
};

export default WeekDate;
