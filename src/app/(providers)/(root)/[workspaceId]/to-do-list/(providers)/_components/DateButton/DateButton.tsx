'use client';
import Typography from '@/components/Typography';
import useDateStore from '@/store/dateStore';
import { cva } from 'class-variance-authority';
import { Dayjs } from 'dayjs';
import { useShallow } from 'zustand/react/shallow';

const DateButton = ({ date }: { date: Dayjs }) => {
  const { selectedDate, handleClickDate } = useDateStore(
    useShallow((state) => ({
      selectedDate: state.selectedDate,
      handleClickDate: state.handleClickDate
    }))
  );

  return (
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
  );
};

export default DateButton;

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
