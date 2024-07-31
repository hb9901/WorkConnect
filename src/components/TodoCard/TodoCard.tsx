import clsx from 'clsx';
import { ReactNode } from 'react';
import Typography from '../Typography';

export interface TodoCardProps {
  title: string;
  subtitle?: string;
  tag?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className: string;
}

const TodoCard = ({ title, subtitle, onClick, tag, className, ...props }: TodoCardProps) => {
  return (
    <div
      className={clsx(
        `flex justify-between items-start w-full h-[70px] px-[16px] py-[12px] p-3 bg-[#FAFAFA] rounded-lg shadow-md`,
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="flex flex-col">
        <Typography variant="Title16px" color="grey700Black">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="Subtitle14px" color="grey400">
            {subtitle}
          </Typography>
        )}
      </div>
      {tag}
    </div>
  );
};

export default TodoCard;
