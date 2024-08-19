'use client';
import Typography from '@/components/Typography';
import useDateStore from '@/store/dateStore';
import { cva } from 'class-variance-authority';
import { Dayjs } from 'dayjs';

interface DateButtonProps {
  date: Dayjs;
  isSameMonth: boolean;
  isSelected: boolean;
}

const DateButton = ({ date, isSameMonth, isSelected }: DateButtonProps) => {
  const handleClickDate = useDateStore((state) => state.handleClickDate);
  const weekName = date.day();

  return (
    <Typography
      variant="Body14px"
      color={weekName === 0 ? 'error' : weekName === 6 ? 'information' : 'grey600'}
      className={isSameMonth ? 'opacity-100' : 'opacity-50'}
    >
      <button
        className={buttonVariants({
          isSelected: isSelected
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
