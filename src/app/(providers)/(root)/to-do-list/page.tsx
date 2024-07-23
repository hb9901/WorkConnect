import ToDoAddButton from "./_components/ToDoAddButton";
import ToDoList from "./_components/ToDoList";
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
      <main>
        <ToDoList />
        <ToDoAddButton />
      </main>
    </>
  );
};

export default ToDoListPage;
