import useBottomsheetModalBackDropStore from '@/store/bottomsheetModalBackDropStore';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

const useBottomTime = (initStartTime: Dayjs, initEndTime: Dayjs) => {
  const [startTime, setStartTime] = useState<Dayjs>(initStartTime);
  const [endTime, setEndTime] = useState<Dayjs>(initEndTime);
  const [isStartTime, setIsStartTime] = useState<boolean>(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const handleOpen = useBottomsheetModalBackDropStore((state) => state.handleOpen);

  const handleSetStartTime = (startTime: Dayjs) => {
    setStartTime(startTime);
  };

  const handleSetEndTime = (endTime: Dayjs) => {
    setEndTime(endTime);
  };

  const handleTimeClick = (isStart: boolean) => {
    handleOpen();
    setIsStartTime(isStart);
    isStart ? setStartTime(dayjs(startTime)) : setEndTime(dayjs(endTime));
    setIsCalendarOpen(false);
  };

  const handleCalendarClick = () => {
    handleOpen();
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
