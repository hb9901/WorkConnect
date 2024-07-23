import WeekButtons from "./_components/WeekButtons";
import WeekDate from "./_components/WeekDate";
import WeekName from "./_components/WeekName";

const ToDoListPage = () => {
  return (
    <>
      <header>
        <WeekButtons />
        <WeekName />
        <WeekDate />
      </header>
    </>
  );
};

export default ToDoListPage;
