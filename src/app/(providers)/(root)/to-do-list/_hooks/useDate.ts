import { Dayjs } from "dayjs";
import { useState } from "react";

const useDate = (initialDate: Dayjs) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(initialDate);
  const [weekDif, setWeekDif] = useState<number>(0);

  const handleClickNextWeek = () => {
    setWeekDif((prevWeekDif) => prevWeekDif + 1);
  };

  const handleClickPreviousWeek = () => {
    setWeekDif((prevWeekDif) => prevWeekDif - 1);
  };

  const handleClickDate = (newDate: Dayjs) => {
    setSelectedDate(newDate);
  };

  return {
    selectedDate,
    weekDif,
    handleClickNextWeek,
    handleClickPreviousWeek,
    handleClickDate,
  };
};

export default useDate;
