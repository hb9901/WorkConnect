import { ReactNode } from 'react';
import Typography from '../Typography';
import { PinIcon } from '@/icons';

export type ChatStatus = '미팅・회의' | '재택 근무 중' | '휴가' | '병가・연차' | '출장' | '자리 비움';
export interface ChatCardProps {
  icon?: ReactNode;
  name: string;
  status?: ChatStatus;
  date: string;
  message: string;
  unreadCount?: number | undefined;
  userCount?: number;
  pin?: boolean;
}

const ChatCard = ({ icon, name, status, date, message, unreadCount, pin, userCount, ...props }: ChatCardProps) => {
  return (
    <div className="flex items-start justify-between p-4 border-b border-white bg-transparent w-full" {...props}>
      <div className="flex flex-row w-full gap-x-3">
        <div className="flex items-center justify-center flex-shrink-0">{icon}</div>
        <div className="flex flex-col justify-between h-[59px] overflow-hidden">
          <div className="flex flex-row mb-[8px] overflow-hidden">
            <Typography
              variant="Title18px"
              color="grey700Black"
              className="mr-2 overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {name}
            </Typography>
            <Typography
              variant="Subtitle14px"
              color="grey200"
              className="flex flex-row gap-1 items-center justify-center"
            >
              {userCount && (
                <Typography as="span" variant="Subtitle18px" color="grey300">
                  {userCount}
                </Typography>
              )}
              <span className="flex-shrink-0 overflow-hidden text-ellipsis whitespace-nowrap">
                {status && `- ${status}`}
              </span>
              {pin ? <PinIcon /> : ''}
            </Typography>
          </div>
          <Typography variant="Subtitle16px" color="grey400" className="overflow-hidden text-ellipsis">
            <span className="text-ellipsis overflow-hidden whitespace-nowrap">{message}</span>
          </Typography>
        </div>
        <div className="flex ml-auto flex-shrink-0">
          <div className="flex flex-col ml-auto">
            <Typography variant="Body12px" color="grey300" className="mb-[14px]">
              {date}
            </Typography>
            <div className="ml-auto">
              {unreadCount !== undefined && unreadCount > 0 && (
                <div className="flex items-center justify-center w-6 h-6 bg-primary200Main text-white rounded-full">
                  {unreadCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
