import Typography from '@/components/Typography';
import { Dayjs } from 'dayjs';
import DateButton from '../DateButton';

interface MobileDateProps {
  weekName: string;
  date: Dayjs;
  isSelected: boolean;
}

const MobileDate = ({ weekName, date, isSelected }: MobileDateProps) => {
  return (
    <div className="flex flex-col gap-[16px] items-center lg:hidden" key={date.date()}>
      <Typography variant="Title14px" color="grey600">
        {weekName}
      </Typography>
      <DateButton date={date} isSelected={isSelected} />
    </div>
  );
};

export default MobileDate;
