import Tag from '@/components/Tag';
import Typography from '@/components/Typography';
import Link from 'next/link';
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
  if (!(priority === 'high' || priority === 'medium' || priority === 'low')) return;

  return (
    <Link
      href={`to-do-list/add/${id}`}
      className="flex flex-row justify-between items-center rounded-[8px] bg-[#FAFAFA] px-[16px] py-[12px] shadow-sm shadow-slate-200 hover:brightness-90 active:brightness-75
      lg:w-full lg:py-[24px] lg:shadow-md "
    >
      <div className="flex flex-col gap-[6px]">
        <Typography variant="Title16px" color="grey700Black">
          {title}
        </Typography>
        <div>
          <Typography variant="Subtitle14px" color="grey400">
            {changeDateStr(startDate, endDate)} | {place}
          </Typography>
        </div>
      </div>
      <Tag theme={priority}>{priority}</Tag>
    </Link>
  );
};

export default Todo;
