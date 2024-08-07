import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, useState } from 'react';

const useInput = (initTime: Dayjs) => {
  const [title, setTitle] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isPriorityOpen, setIsPriorityOpen] = useState<boolean>(false);
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Dayjs>(initTime);
  const [endTime, setEndTime] = useState<Dayjs>(initTime);
  const [isStartTime, setIsStartTime] = useState<boolean>(true);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangePriority = (priority: string) => {
    setSelectedPriority(priority);
  };

  const handleChangeStatus = (status: string) => {
    setSelectedStatus(status);
  };

  const handlePriorityClick = () => {
    setIsPriorityOpen((prev) => !prev);
  };

  const handleStatusClick = () => {
    setIsStatusOpen((prev) => !prev);
  };

  const handleSetStartTime = (startTime: Dayjs) => {
    setStartTime(startTime);
  };
  const handleSetEndTime = (endTime: Dayjs) => {
    setEndTime(endTime);
  };

  const handleTimeClick = (isStart: boolean) => {
    setIsStartTime(isStart);
    isStart ? setStartTime(dayjs(startTime)) : setEndTime(dayjs(endTime));
    setIsBottomSheetOpen((prev) => !prev);
  };

  const hanldeBottomSheetClick = () => {
    setIsBottomSheetOpen((prev) => !prev);
  };

  return {
    title,
    selectedPriority,
    selectedStatus,
    isPriorityOpen,
    isStatusOpen,
    startTime,
    endTime,
    isStartTime,
    isBottomSheetOpen,
    setStartTime,
    setEndTime,
    setSelectedStatus,
    setSelectedPriority,
    setTitle,
    handleTitleChange,
    handleChangePriority,
    handleChangeStatus,
    handlePriorityClick,
    handleStatusClick,
    handleSetStartTime,
    handleSetEndTime,
    handleTimeClick,
    hanldeBottomSheetClick
  };
};

export default useInput;
