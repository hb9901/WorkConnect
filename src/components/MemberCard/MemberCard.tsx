import Image from 'next/image';
import { ReactNode } from 'react';
import CheckIcon from '../../icons/MemberCardCheck.svg';
import UnCheckIcon from '../../icons/MemberCardUnCheck.svg';
import Typography from '../Typography';

export interface MemberCardProps {
  name: string;
  position?: string;
  status?: string;
  icon?: ReactNode;
  checked: boolean;
  onToggle?: () => void;
}

/** @deprecated */
export const MemberCard = ({ name, position, status, icon, checked, onToggle }: MemberCardProps) => {
  return (
    <div
      className="flex items-center justify-between p-4 border-b border-white bg-transparent w-full"
      onClick={onToggle}
    >
      <div className="flex items-center overflow-hidden">
        <div className="flex items-center justify-center mr-4 flex-shrink-0">{icon}</div>
        <div className="overflow-hidden">
          <Typography
            variant="Title18px"
            color="grey700Black"
            className="whitespace-nowrap overflow-hidden overflow-ellipsis"
          >
            {name}
          </Typography>
          <Typography variant="Subtitle12px" color="grey300">
            {position}
          </Typography>
        </div>
      </div>
      <Typography variant="Title14px" color="grey500" className="flex flex-row gap-1 flex-shrink-0">
        {status}
        {checked ? (
          <Image src={CheckIcon} alt="check" className="cursor-pointer" />
        ) : (
          <Image src={UnCheckIcon} alt="uncheck" className="cursor-pointer" />
        )}
      </Typography>
    </div>
  );
};

export default MemberCard;
