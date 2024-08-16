import useBottomsheetModalBackDropStore from '@/store/bottomsheetModalBackDropStore';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';

const useBottomTime = (initStartTime: Dayjs, initEndTime: Dayjs) => {
  const memoizedInitStartTime = useMemo(() => initStartTime, []);
  const memoizedInitEndTime = useMemo(() => initEndTime, []);
  const [startTime, setStartTime] = useState<Dayjs>(initStartTime);
  const [endTime, setEndTime] = useState<Dayjs>(initEndTime);
  const [isStartTime, setIsStartTime] = useState<boolean>(true);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const setOpen = useBottomsheetModalBackDropStore((state) => state.setOpen);

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
    setOpen();
    setIsStartTime(isStart);
    isStart ? setStartTime(dayjs(startTime)) : setEndTime(dayjs(endTime));
    setIsBottomSheetOpen((prev) => !prev);
    setIsCalendarOpen(false);
  }, []);

  const hanldeBottomSheetClick = useCallback(() => {
    setOpen();
    setIsBottomSheetOpen((prev) => !prev);
  }, []);

  const handleCalendarClick = () => {
    setOpen();
    setIsCalendarOpen(true);
  };

  return {
    startTime,
    endTime,
    isStartTime,
    isBottomSheetOpen,
    isCalendarOpen,
    setStartTime,
    setEndTime,
    handleSetStartTime,
    handleSetEndTime,
    handleTimeClick,
    hanldeBottomSheetClick,
    handleCalendarClick
  };
};

export default useBottomTime;
