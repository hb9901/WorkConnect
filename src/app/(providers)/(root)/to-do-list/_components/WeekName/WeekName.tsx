const WeekName = () => {
  const weekNames = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="flex flex-row gap-x-4">
      {weekNames.map((weekName, index) => (
        <div key={index}>{weekName}</div>
      ))}
    </div>
  );
};

export default WeekName;
