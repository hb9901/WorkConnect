'use client';
import { weekNames } from '@/assets/weekNames';
import Typography from '@/components/Typography';
import useDateStore from '@/store/dateStore';
import dayjs from 'dayjs';
import ToDoAddButton from '../ToDoAddButton';

const PcHeader = () => {
  const selectedDate = dayjs(useDateStore((state) => state.selectedDate));
  const dayName = weekNames[selectedDate.day()];
  const dateStr = selectedDate.format('YYYY. MM. DD');

  return (
    <header className="hidden lg:grid lg:top-0 lg:right-0 lg:left-[384px] lg:h-[84px] lg:border-[#E5E7EB] lg:border-b-[1px]">
      <div className="flex flex-row justify-between items-center p-[16px]">
        <Typography variant="Title22px" color="grey700Black">
          {`${dateStr} ${dayName}요일`}
        </Typography>
        <ToDoAddButton />
      </div>
    </header>
  );
};

export default PcHeader;
