'use client';

import useTimeModalStore from '@/store/timeModalStore';
import { cva } from 'class-variance-authority';
import dayjs from 'dayjs';
import { useState } from 'react';
import ModalBackDrop from '../ModalBackDrop';

const DateInputModal = () => {
  const { isStartTime, startTime, endTime, setTimeModalClose, setStartTime, setEndTime } = useTimeModalStore();
  const time = isStartTime ? dayjs(startTime) : dayjs(endTime);
  const [isAm, setIsAm] = useState(time.format('a') === 'am');
  const [hour, setHour] = useState(time.format('a') === 'am' ? time.hour() : time.hour() - 12);
  const [minute, setMinute] = useState(time.minute());
  const regHour = /^([0-9]|1[0-2])$/;
  const regMinute = /^([0-5][0-9]|[0-9])$/;

  const checkHourStr = (hour: number) => {
    if (regHour.test(String(hour))) setHour(hour);
  };

  const checkMinuteStr = (minute: number) => {
    if (regMinute.test(String(minute))) setMinute(minute);
  };

  const handleAM = () => {
    setIsAm(true);
  };

  const handlePM = () => {
    setIsAm(false);
  };

  const handleHourUp = () => {
    if (hour >= 12) {
      setHour(1);
    } else {
      if (regHour.test(String(hour))) setHour((prevHour) => prevHour + 1);
    }
  };

  const handleHourDown = () => {
    if (hour <= 1) {
      setHour(12);
    } else {
      if (regHour.test(String(hour))) setHour((prevHour) => prevHour - 1);
    }
  };
  const handleMinuteUp = () => {
    if (minute >= 59) {
      setMinute(0);
    } else {
      if (regMinute.test(String(minute))) setMinute((prevMinute) => prevMinute + 1);
    }
  };
  const handleMinuteDown = () => {
    if (minute <= 0) {
      setMinute(59);
    } else {
      if (regMinute.test(String(minute))) setMinute((prevMinute) => prevMinute - 1);
    }
  };

  const handleCancle = () => {
    setTimeModalClose();
  };

  const handleCheck = () => {
    const newTime = dayjs()
      .set('hour', isAm ? hour : hour + 12)
      .set('minute', minute);

    isStartTime ? setStartTime(newTime) : setEndTime(newTime);
    setTimeModalClose();
  };

  return (
    <ModalBackDrop>
      <div className="flex flex-col w-72 h-44 rounded-lg bg-white">
        <div className="flex flex-row items-center m-auto gap-6">
          <div className="flex flex-col gap-1">
            <button onClick={handleAM} className={buttonVariants({ isSelected: isAm })}>
              오전
            </button>
            <button onClick={handlePM} className={buttonVariants({ isSelected: !isAm })}>
              오후
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={handleHourUp}>위</button>
            <input
              className="w-10 text-center appearance-none"
              type="number"
              value={Number(hour)}
              pattern="[0-9]*"
              onChange={(e) => checkHourStr(Number(e.target.value))}
            />
            <button onClick={handleHourDown}>아래</button>
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={handleMinuteUp}>위</button>
            <input
              className="w-10 text-center appearance-none"
              type="number"
              value={Number(minute)}
              pattern="[0-9]*"
              onChange={(e) => checkMinuteStr(Number(e.target.value))}
            />
            <button onClick={handleMinuteDown}>아래</button>
          </div>
        </div>
        <div className="grid grid-cols-2 h-14">
          <button onClick={handleCancle} className="text-red-400">
            취소
          </button>
          <button onClick={handleCheck}>확인</button>
        </div>
      </div>
    </ModalBackDrop>
  );
};

export default DateInputModal;

const buttonVariants = cva('rounded-md p-2', {
  variants: {
    isSelected: {
      true: 'text-red-400 border border-black',
      false: ' '
    }
  },
  defaultVariants: {
    isSelected: false
  }
});
