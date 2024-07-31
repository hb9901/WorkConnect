import { ReactNode } from 'react';
import Typography from '../Typography';

export interface ChatCardProps {
  icon: ReactNode;
  name: string;
  status: string;
  date: string;
  message: string;
  unreadCount?: number | undefined;
  pin: ReactNode;
}

const ChatCard = ({ icon, name, status, date, message, unreadCount, pin, ...props }: ChatCardProps) => {
  return (
    <div className="flex items-start justify-between p-4 border-b border-white bg-transparent w-full" {...props}>
      <div className="flex flex-row w-full">
        <div className="flex items-center justify-center mr-[12px] ">{icon}</div>
        <div className="flex flex-col">
          <div className="flex flex-row mb-[8px]">
            <Typography variant="Title18px" color="grey700Black" className="mr-2">
              {name}
            </Typography>
            <Typography variant="Subtitle14px" color="grey200" className="flex flex-row gap-1">
              {status}
              {pin}
            </Typography>
          </div>
          <Typography variant="Subtitle16px" color="grey400">
            {message}
          </Typography>
        </div>
        <div className="flex ml-auto">
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
