"use client";
import useDateStore from "@/zustand/dateStore";
import { getWeekDates } from "./function";

const WeekDate = () => {
  const { selectedDate, handleClickDate } = useDateStore();
  const weekDates = getWeekDates(selectedDate);

  return (
    <div className="flex flex-row gap-4">
      {weekDates.map((date) => (
        <div key={date.date()}>
          <button onClick={() => handleClickDate(date)}>{date.date()}</button>
        </div>
      ))}
    </div>
  );
};

export default WeekDate;
