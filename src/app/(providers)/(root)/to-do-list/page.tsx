"use client";
import dayjs, { Dayjs } from "dayjs";

const getWeekDates = (baseDate: Dayjs, weekDif = 0): Dayjs[] => {
  const date = dayjs(baseDate).add(weekDif, "week");
  const startOfWeek = date.startOf("week");
  const weekArr = Array.from({ length: 7 }, (_, index) =>
    startOfWeek.add(index, "day")
  );

  return weekArr;
};

const ToDoListPage = () => {
  const today = dayjs();
  return <div>page</div>;
};

export default ToDoListPage;
