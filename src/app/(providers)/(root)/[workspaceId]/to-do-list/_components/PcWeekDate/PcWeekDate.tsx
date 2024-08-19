import Typography from '@/components/Typography';
import useDateStore from '@/store/dateStore';
import { Dayjs } from 'dayjs';

interface PcDateProps {
  weekName: string;
  date: Dayjs;
  isSelected: boolean;
}
const PcDate = ({ weekName, date, isSelected }: PcDateProps) => {
  const handleClickDate = useDateStore((state) => state.handleClickDate);

  return (
    <>
      <button
        onClick={() => handleClickDate(date)}
        className={`hidden lg:flex lg:flex-row lg:items-center lg:justify-center lg:h-[93px] lg:w-full ${isSelected ? 'bg-[#EBECFE]' : ''}`}
        key={date.date()}
      >
        <Typography
          variant="Title18px"
          color={
            isSelected
              ? 'primary200Main'
              : weekName === '토'
                ? 'information'
                : weekName === '일'
                  ? 'error'
                  : 'grey700Black'
          }
          className="lg:flex lg:gap-[24px]"
        >
          <span>{date.date()}</span>
          <span>{weekName}</span>
        </Typography>
      </button>
    </>
  );
};

export default PcDate;
