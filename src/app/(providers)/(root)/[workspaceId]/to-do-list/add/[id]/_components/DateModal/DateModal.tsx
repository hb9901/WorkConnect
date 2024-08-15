import Button from '@/components/Button';
import DateButtons from '../../../../_components/DateButtons';
import MonthDate from '../../../../_components/MonthDate';

export interface DateModalProps {
  selectedDateStr: string;
  onClick: () => void;
}

const DateModal = ({ selectedDateStr, onClick }: DateModalProps) => {
  return (
    <div className="w-full">
      <div className="flex pt-[12px] px-[16px] justify-start items-end gap-[8px] w-[375px]">
        <DateButtons showWeeklyButton={false} />
      </div>
      <div className="grid w-full mb-[12px] lg:mb-0 lg:w-[375px] px-[12px]">
        <MonthDate />
      </div>
      <div className="lg:hidden">
        <Button theme="primary" onClick={onClick} isFullWidth>
          {selectedDateStr}
        </Button>
      </div>
    </div>
  );
};

export default DateModal;
