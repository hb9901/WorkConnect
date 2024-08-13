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
      <div className="lg:absolute lg:top-[84px] lg:bottom-0 lg:left-0 lg:right-[calc(100%-297px)] lg:bg-[#F4F4F6] lg:-z-[1]"></div>
      <button
        onClick={() => handleClickDate(date)}
        className={`hidden lg:flex lg:flex-row lg:items-center lg:justify-center lg:h-[93px] lg:w-full ${isSelected ? 'bg-[#EBECFE]' : ''}`}
        key={date.date()}
      >
        <Typography
          variant="Title18px"
          color={isSelected ? 'primary200Main' : 'grey700Black'}
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
