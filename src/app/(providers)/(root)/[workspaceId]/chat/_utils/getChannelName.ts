import { GetUsersInChannelResponse } from '@/types/channel';

export const getDmChannelName = (usersInChannel: GetUsersInChannelResponse) => {
  const result = Object.keys(usersInChannel).map((key) => {
    return usersInChannel[key].name;
  });

  return result.length > 1 ? null : result[0];
};
