'use client';

import Button from '@/components/Button';
import Typography from '@/components/Typography';
import dayjs, { Dayjs } from 'dayjs';
import useTime from '../../_hooks/useTime';
import TimeInput from '../TimeInput';

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
  const initIsAM = time.format('a') === 'am';
  const initHour = time.format('a') === 'am' ? time.hour() : time.hour() - 12;
  const initMinute = time.minute();
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
  } = useTime(initIsAM, initHour, initMinute);

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
          <TimeInput handleUp={handleHourUp} handleDown={handleHourDown} time={hour} checkStr={checkHourStr} />
          <Typography variant="Title22px" color="grey900">
            :
          </Typography>
          <TimeInput handleUp={handleMinuteUp} handleDown={handleMinuteDown} time={minute} checkStr={checkMinuteStr} />
        </div>
        <Button theme="primary" isFullWidth onClick={handleCheck}>
          확인
        </Button>
      </div>
    </>
  );
};

export default DateBottom;
