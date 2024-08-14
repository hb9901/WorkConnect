import { GetUsersInChannelResponse } from '@/types/channel';
import dayjs from 'dayjs';

type GetLastActiveAtProps = {
  usersInChannel: GetUsersInChannelResponse;
  workspaceUserId: string;
};

export const getLastActiveAtForChannel = ({ usersInChannel, workspaceUserId }: GetLastActiveAtProps) => {
  const remainingUsers = Object.values(usersInChannel).filter((user) => user.workspace_user_id !== workspaceUserId);
  return remainingUsers.length === 1 ? dayjs(remainingUsers[0].last_active_at) : null;
};
