import { ReactNode } from 'react';
import Typography from '../Typography';

export interface MemberCardProps {
  name: string;
  position: string;
  status: string;
  icon?: ReactNode;
  children?: ReactNode;
}

const MemberCard = ({ name, position, status, icon, children }: MemberCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-white bg-transparent w-full">
      <div className="flex items-center">
        <div className="flex items-center justify-center mr-4">{icon}</div>
        <div>
          <Typography variant="Title18px" color="grey700Black">
            {name}
          </Typography>
          <Typography variant="Subtitle12px" color="grey300">
            {position}
          </Typography>
        </div>
      </div>
      <Typography variant="Title14px" color="grey500" className="flex flex-row gap-1">
        {status}
        {children}
      </Typography>
    </div>
  );
};

export default MemberCard;
