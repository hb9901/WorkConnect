'use client';

import useDateStore from '@/store/dateStore';

const WeekButtons = () => {
  const { selectedDate, handleClickNextWeek, handleClickPreviousWeek } = useDateStore();
  const year = selectedDate.year();
  const month = selectedDate.month() + 1;

  return (
    <div className="flex flex-row justify-between mb-5">
      <div className="flex flex-row gap-4">
        <strong>
          {year}.{month}
        </strong>
        <div>
          <button onClick={handleClickPreviousWeek}>{`<`}</button>
          <button onClick={handleClickNextWeek}>{`>`}</button>
        </div>
      </div>
      <button className="text-slate-500 text-sm">오늘</button>
    </div>
  );
};

export default WeekButtons;
