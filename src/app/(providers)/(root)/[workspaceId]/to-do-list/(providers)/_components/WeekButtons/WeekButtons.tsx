'use client';

import Typography from '@/components/Typography';
import ChevronLeftIcon from '@/icons/ChevronLeft.svg';
import ChevronRightIcon from '@/icons/ChevronRight.svg';
import useDateStore from '@/store/dateStore';
import dayjs from 'dayjs';

const WeekButtons = () => {
  const { selectedDate, handleClickNextWeek, handleClickPreviousWeek } = useDateStore();
  const date = dayjs(selectedDate).format('YYYY.MM.');

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row items-center gap-[16px]">
        <Typography variant="Title22px" color="grey900">
          {date}
        </Typography>
        <div className="flex flex-row gap-[8px]">
          <button onClick={handleClickPreviousWeek}>
            <div className="flex items-center justify-center w-[20px] h-[20px] rounded-full border-[1px] border-[#737B91]">
              <ChevronLeftIcon className="w-[10px] h-[10px]" />
            </div>
          </button>
          <button onClick={handleClickNextWeek}>
            <div className="flex items-center justify-center w-[20px] h-[20px] rounded-full border-[1px] border-[#737B91]">
              <ChevronRightIcon className="w-[10px] h-[10px]" />
            </div>
          </button>
        </div>
      </div>
      <button>
        <Typography variant="Subtitle16px" color="grey500">
          오늘
        </Typography>
      </button>
    </div>
  );
};

export default WeekButtons;
