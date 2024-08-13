'use client';

import Typography from '@/components/Typography';
import ChevronLeftIcon from '@/icons/ChevronLeft.svg';
import ChevronRightIcon from '@/icons/ChevronRight.svg';
import useDateStore from '@/store/dateStore';
import dayjs, { Dayjs } from 'dayjs';
import { useShallow } from 'zustand/react/shallow';

const DateButtons = () => {
  const { selectedDate, isWeekly, changeIsWeekly, handleClickNext, handleClickPrevious, handleClickDate } =
    useDateStore(
      useShallow((state) => ({
        selectedDate: state.selectedDate,
        isWeekly: state.isWeekly,
        changeIsWeekly: state.changeIsWeekly,
        handleClickNext: state.handleClickNext,
        handleClickPrevious: state.handleClickPrevious,
        handleClickDate: state.handleClickDate
      }))
    );
  const date = dayjs(selectedDate).format('YYYY.MM.');
  const today = dayjs();

  const handleClickWeekOrMonth = (today: Dayjs) => {
    changeIsWeekly();
    handleClickDate(today);
  };

  return (
    <div className="flex flex-row justify-between lg:px-[12px] lg:py-[14px]">
      <div className="flex flex-row items-center gap-[16px] lg:gap-[12px]">
        <Typography variant="Title22px" color="grey900">
          {date}
        </Typography>
        <div className="flex flex-row gap-[8px]">
          <button
            onClick={handleClickPrevious}
            className="flex items-center justify-center w-[20px] h-[20px] rounded-full border-[1px] border-[#737B91]"
          >
            <div>
              <ChevronLeftIcon className="w-[10px] h-[10px] stroke-[#737B91]" />
            </div>
          </button>
          <button onClick={handleClickNext}>
            <div className="flex items-center justify-center w-[20px] h-[20px] rounded-full border-[1px] border-[#737B91]">
              <ChevronRightIcon className="w-[10px] h-[10px]" />
            </div>
          </button>
        </div>
      </div>
      <button
        onClick={() => handleClickWeekOrMonth(today)}
        className="flex flex-shrink-0 w-[50px] px-[2px] justify-center items-center rounded-[14px] bg-[#F7F7F7] lg:bg-[#E5E7EB]"
      >
        <Typography variant="Subtitle16px" color="grey700Black">
          {isWeekly ? '월' : '주'}
        </Typography>
      </button>
    </div>
  );
};

export default DateButtons;
