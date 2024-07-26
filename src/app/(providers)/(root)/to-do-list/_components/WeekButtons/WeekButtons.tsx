'use client';

import useDateStore from '@/store/dateStore';

const WeekButtons = () => {
  const { selectedDate, handleClickNextWeek, handleClickPreviousWeek } = useDateStore();
  const year = selectedDate.year();
  const month = selectedDate.month() + 1;
  const day = selectedDate.date();

  return (
    <div>
      <strong>
        {year}.{month}.{day}
      </strong>
      <div>
        <button onClick={handleClickPreviousWeek}>{`<`}</button>
        <button onClick={handleClickNextWeek}>{`>`}</button>
      </div>
    </div>
  );
};

export default WeekButtons;
