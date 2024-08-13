import { useEffect, useState } from 'react';

const useTime = (initIsAm: boolean, initHour: number, initMinute: number) => {
  const [isAm, setIsAm] = useState(initIsAm);
  const [hour, setHour] = useState(initHour);
  const [minute, setMinute] = useState(initMinute);
  const regHour = /^([0-9]|1[0-2])$/;
  const regMinute = /^([0-5][0-9]|[0-9])$/;

  useEffect(() => {
    setIsAm(initIsAm);
    setHour(initHour);
    setMinute(initMinute);
  }, [initIsAm, initHour, initMinute]);

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

  return {
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
  };
};

export default useTime;
