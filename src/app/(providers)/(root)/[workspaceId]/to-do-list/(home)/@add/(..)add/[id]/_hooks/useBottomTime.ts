import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';

const useBottomTime = (initStartTime: Dayjs, initEndTime: Dayjs) => {
  const memoizedInitStartTime = useMemo(() => initStartTime, []);
  const memoizedInitEndTime = useMemo(() => initEndTime, []);
  const [startTime, setStartTime] = useState<Dayjs>(initStartTime);
  const [endTime, setEndTime] = useState<Dayjs>(initEndTime);
  const [isStartTime, setIsStartTime] = useState<boolean>(true);
  const [isTimeBottomSheetOpen, setIsTimeBottomSheetOpen] = useState<boolean>(false);

  useEffect(() => {
    setStartTime(memoizedInitStartTime);
    setEndTime(memoizedInitEndTime);
  }, [memoizedInitStartTime, memoizedInitEndTime]);

  const handleSetStartTime = useCallback((startTime: Dayjs) => {
    setStartTime(startTime);
  }, []);
  const handleSetEndTime = useCallback((endTime: Dayjs) => {
    setEndTime(endTime);
  }, []);

  const handleTimeClick = useCallback((isStart: boolean) => {
    setIsStartTime(isStart);
    isStart ? setStartTime(dayjs(startTime)) : setEndTime(dayjs(endTime));
    setIsTimeBottomSheetOpen((prev) => !prev);
  }, []);

  const hanldeBottomSheetClick = useCallback(() => {
    setIsTimeBottomSheetOpen((prev) => !prev);
  }, []);

  return {
    startTime,
    endTime,
    isStartTime,
    isTimeBottomSheetOpen,
    setStartTime,
    setEndTime,
    handleSetStartTime,
    handleSetEndTime,
    handleTimeClick,
    hanldeBottomSheetClick
  };
};

export default useBottomTime;
