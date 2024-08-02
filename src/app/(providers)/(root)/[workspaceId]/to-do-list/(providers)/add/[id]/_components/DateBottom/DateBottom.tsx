'use client';

import Button from '@/components/Button';
import Typography from '@/components/Typography';
import ChevronDownIcon from '@/icons/ChevronDown.svg';
import ChevronUpIcon from '@/icons/ChevronUpIcon.svg';
import dayjs, { Dayjs } from 'dayjs';
import useTime from '../../_hooks/useTime';

interface DateBottomProps {
  isStartTime: boolean;
  handleClose: () => void;
  startTime: Dayjs;
  endTime: Dayjs;
  handleSetStartTime: (startTime: Dayjs) => void;
  handleSetEndTime: (endTime: Dayjs) => void;
}

const DateBottom = ({
  isStartTime,
  handleClose,
  startTime,
  endTime,
  handleSetStartTime,
  handleSetEndTime
}: DateBottomProps) => {
  const time = isStartTime ? dayjs(startTime) : dayjs(endTime);
  const {
    isAm,
    hour,
    minute,
    checkHourStr,
    checkMinuteStr,
    handleAM,
    handlePM,
    handleHourUp,
    handleHourDown,
    handleMinuteUp,
    handleMinuteDown
  } = useTime(time);

  const handleCheck = () => {
    const newTime = dayjs()
      .set('hour', isAm ? hour : hour + 12)
      .set('minute', minute);

    isStartTime ? handleSetStartTime(newTime) : handleSetEndTime(newTime);
    handleClose();
  };

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center pt-[12px] pb-[8px]">
        <div className="flex flex-row w-full items-center justify-between gap-[9px]">
          <Button theme={isAm ? 'primary' : 'grey'} onClick={handleAM} isFullWidth>
            오전
          </Button>
          <Button theme={isAm ? 'grey' : 'primary'} onClick={handlePM} isFullWidth>
            오후
          </Button>
        </div>
        <div className="flex flex-row items-center mt-[12px] mb-[24px] gap-[42px]">
          <div className="flex flex-col items-center gap-2">
            <button onClick={handleHourUp}>
              <ChevronUpIcon />
            </button>
            <Typography variant="Title22px" color="grey900">
              <div className="flex items-center justify-center w-[71px] h-[71px] bg-[#FAFAFA] rounded-[6px]">
                <input
                  className="w-10 text-center bg-[#FAFAFA] appearance-none"
                  type="text"
                  inputMode="numeric"
                  value={Number(hour)}
                  pattern="[0-9]*"
                  onChange={(e) => checkHourStr(Number(e.target.value))}
                />
              </div>
            </Typography>
            <button onClick={handleHourDown}>
              <ChevronDownIcon />
            </button>
          </div>
          <Typography variant="Title22px" color="grey900">
            :
          </Typography>
          <div className="flex flex-col items-center gap-2">
            <button onClick={handleMinuteUp}>
              <ChevronUpIcon />
            </button>
            <Typography variant="Title22px" color="grey900">
              <div className="flex items-center justify-center w-[71px] h-[71px] bg-[#FAFAFA] rounded-[6px]">
                <input
                  className="w-10 text-center bg-[#FAFAFA] appearance-none focus:outline-none"
                  type="text"
                  inputMode="numeric"
                  value={Number(minute)}
                  pattern="[0-9]*"
                  onChange={(e) => checkMinuteStr(Number(e.target.value))}
                />
              </div>
            </Typography>
            <button onClick={handleMinuteDown}>
              <ChevronDownIcon />
            </button>
          </div>
        </div>
        <Button theme="primary" isFullWidth onClick={handleCheck}>
          확인
        </Button>
      </div>
    </>
  );
};

export default DateBottom;
