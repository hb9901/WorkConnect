import useBottomsheetModalBackDropStore from '@/store/bottomsheetModalBackDropStore';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

const useBottomTime = (initStartTime: Dayjs, initEndTime: Dayjs) => {
  const [startTime, setStartTime] = useState<Dayjs>(initStartTime);
  const [endTime, setEndTime] = useState<Dayjs>(initEndTime);
  const [isStartTime, setIsStartTime] = useState<boolean>(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const setOpen = useBottomsheetModalBackDropStore((state) => state.setOpen);

  const handleSetStartTime = (startTime: Dayjs) => {
    setStartTime(startTime);
  };

  const handleSetEndTime = (endTime: Dayjs) => {
    setEndTime(endTime);
  };

  const handleTimeClick = (isStart: boolean) => {
    setOpen();
    setIsStartTime(isStart);
    isStart ? setStartTime(dayjs(startTime)) : setEndTime(dayjs(endTime));
    setIsCalendarOpen(false);
  };

  const handleCalendarClick = () => {
    setOpen();
    setIsCalendarOpen(true);
  };

  return {
    startTime,
    endTime,
    isStartTime,
    isCalendarOpen,
    setStartTime,
    setEndTime,
    handleSetStartTime,
    handleSetEndTime,
    handleTimeClick,
    handleCalendarClick
  };
};

export default useBottomTime;
