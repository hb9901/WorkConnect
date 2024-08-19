import Tag from '@/components/Tag';
import Typography from '@/components/Typography';
import { useDraggable } from '@dnd-kit/core';
import { changeDateStr } from '../ToDoList/function';

interface TodoProps {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  place: string | null;
  priority: string | null;
  status: string | null;
}

const Todo = ({ id, title, startDate, endDate, place, priority, status }: TodoProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'todo' + id,
    data: {
      id: id,
      title: title,
      status: status
    }
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex flex-row justify-between items-center rounded-[8px] bg-[#FAFAFA] px-[16px] py-[12px] shadow-sm shadow-slate-200 hover:brightness-90 active:brightness-75
      lg:w-full lg:py-[24px] lg:shadow-md "
    >
      <div className="flex flex-col items-start text-start w-full gap-[6px]">
        <Typography variant="Title16px" color="grey700Black" className="w-full line-clamp-2">
          {title}
        </Typography>
        <div>
          <Typography variant="Subtitle14px" color="grey400" className="w-full line-clamp-2">
            {changeDateStr(startDate, endDate)} {place && '| ' + place}
          </Typography>
        </div>
      </div>
      {(priority === 'high' || priority === 'medium' || priority === 'low') && <Tag theme={priority}>{priority}</Tag>}
    </button>
  );
};

export default Todo;
