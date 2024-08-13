import DateButtons from '../../../../_components/DateButtons';
import MonthDate from '../../../../_components/MonthDate';

export interface DateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DateModal = ({ isOpen, onClose }: DateModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {isOpen && (
        <div className="absolute top-0 bottom-0 left-0 right-0 inset-0 bg-white opacity-0" onClick={onClose} />
      )}
      <div className="absolute bg-white rounded-[6px] px-[8px] py-[6px] flex flex-col items-center">
        <div className="flex pt-[12px] px-[16px] justify-start items-end gap-[8px] w-[375px]">
          <DateButtons showWeeklyButton={false} />
        </div>
        <div className="flex w-[375px] px-[12px]">
          <MonthDate />
        </div>
      </div>
    </div>
  );
};

export default DateModal;
