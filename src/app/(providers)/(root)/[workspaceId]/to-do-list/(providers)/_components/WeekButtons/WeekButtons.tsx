'use client';

import Typography from '@/components/Typography';
import ChevronLeftIcon from '@/icons/ChevronLeft.svg';
import ChevronRightIcon from '@/icons/ChevronRight.svg';
import useDateStore from '@/store/dateStore';
import dayjs from 'dayjs';
import { useShallow } from 'zustand/react/shallow';

const WeekButtons = () => {
  const { selectedDate, handleClickNextWeek, handleClickPreviousWeek, handleClickDate } = useDateStore(
    useShallow((state) => ({
      selectedDate: state.selectedDate,
      handleClickNextWeek: state.handleClickNextWeek,
      handleClickPreviousWeek: state.handleClickPreviousWeek,
      handleClickDate: state.handleClickDate
    }))
  );
  const date = dayjs(selectedDate).format('YYYY.MM.');
  const today = dayjs();

  return (
    <div className="flex flex-row justify-between lg:px-[12px] lg:py-[14px]">
      <div className="flex flex-row items-center gap-[16px] lg:gap-[12px]">
        <Typography variant="Title22px" color="grey900">
          {date}
        </Typography>
        <div className="flex flex-row gap-[8px]">
          <button onClick={handleClickPreviousWeek}>
            <div className="flex items-center justify-center w-[20px] h-[20px] rounded-full border-[1px] border-[#737B91]">
              <ChevronLeftIcon className="w-[10px] h-[10px]" stoke="#737B91" />
            </div>
          </button>
          <button onClick={handleClickNextWeek}>
            <div className="flex items-center justify-center w-[20px] h-[20px] rounded-full border-[1px] border-[#737B91]">
              <ChevronRightIcon className="w-[10px] h-[10px]" />
            </div>
          </button>
        </div>
      </div>
      <button onClick={() => handleClickDate(today)}>
        <Typography variant="Subtitle16px" color="grey500">
          오늘
        </Typography>
      </button>
    </div>
  );
};

export default WeekButtons;
