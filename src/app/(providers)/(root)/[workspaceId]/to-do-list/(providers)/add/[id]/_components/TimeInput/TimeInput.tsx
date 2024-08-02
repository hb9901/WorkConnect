import Typography from '@/components/Typography';
import ChevronDownIcon from '@/icons/ChevronDown.svg';
import ChevronUpIcon from '@/icons/ChevronUpIcon.svg';

interface TimeInputProps {
  handleUp: () => void;
  handleDown: () => void;
  checkStr: (time: number) => void;
  time: number;
}

const TimeInput = ({ handleUp, handleDown, checkStr, time }: TimeInputProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <button onClick={handleUp}>
        <ChevronUpIcon />
      </button>
      <Typography variant="Title22px" color="grey900">
        <div className="flex items-center justify-center w-[71px] h-[71px] bg-[#FAFAFA] rounded-[6px]">
          <input
            className="w-10 text-center bg-[#FAFAFA] appearance-none"
            type="text"
            inputMode="numeric"
            value={time}
            pattern="[0-9]*"
            onChange={(e) => checkStr(Number(e.target.value))}
          />
        </div>
      </Typography>
      <button onClick={handleDown}>
        <ChevronDownIcon />
      </button>
    </div>
  );
};

export default TimeInput;
