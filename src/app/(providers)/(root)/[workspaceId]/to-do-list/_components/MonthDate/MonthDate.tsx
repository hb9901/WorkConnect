'use client';
import { weekNames } from '@/assets/weekNames';
import Typography from '@/components/Typography';
import useDateStore from '@/store/dateStore';
import dayjs from 'dayjs';
import DateButton from '../DateButton';
import { getMonthDates } from './function';

const MonthDate = () => {
  const selectedDate = dayjs(useDateStore((state) => state.selectedDate));
  const monthDates = getMonthDates(selectedDate);

  return (
    <div className="text-center mt-[30px] mb-8px lg:mt-0 lg:mb-0 lg:px-[12px] lg:py-[20px] lg:w-full">
      <div className="grid grid-cols-7">
        {weekNames.map((weekName) => (
          <Typography
            key={weekName}
            variant="Title14px"
            color={weekName === '일' ? 'error' : weekName === '토' ? 'information' : 'grey600'}
          >
            {weekName}
          </Typography>
        ))}
      </div>
      <div className="grid grid-cols-7 mt-[12px] gap-y-[10px]">
        {monthDates.map((date) => (
          <div className="w-full" key={date.format('MM:DD')}>
            <DateButton
              date={date}
              isSameMonth={selectedDate.month() === date.month()}
              isSelected={selectedDate.month() === date.month() && selectedDate.date() === date.date()}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthDate;
