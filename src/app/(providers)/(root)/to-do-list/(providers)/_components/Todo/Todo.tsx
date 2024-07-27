import { useRouter } from 'next/navigation';
import { changeDateStr } from '../ToDoList/function';

interface TodoProps {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  place: string | null;
  priority: string;
}

const Todo = ({ id, title, startDate, endDate, place, priority }: TodoProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/to-do-list/add/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-row justify-between items-center rounded-md bg-slate-300 px-5 py-2 hover:brightness-90 active:brightness-75"
    >
      <div>
        <strong>{title}</strong>
        <div>
          {changeDateStr(startDate, endDate)} | {place}
        </div>
      </div>
      <div>{priority}</div>
    </div>
  );
};

export default Todo;
