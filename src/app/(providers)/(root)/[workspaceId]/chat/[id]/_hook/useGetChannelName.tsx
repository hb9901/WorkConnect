import { useParams } from 'next/navigation';
import { useGetUsersInChannel, useGetGroupChannelName } from '../../_hooks/useQueryChat';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import { getDmChannelName } from '../../_utils/getChannelName';

export const useGetChannelName = () => {
  const { id } = useParams();
  const workspaceUserId = useWorkspaceUserId();
  const stringId = Array.isArray(id) ? id[0] : id;

  const { data: groupChannelName } = useGetGroupChannelName({ id: stringId });

  const { data: usersInChannel = {} } = useGetUsersInChannel({
    channel_id: Number(stringId),
    workspace_user_id: workspaceUserId
  });

  const dmChannelName = getDmChannelName(usersInChannel);

  return dmChannelName ?? groupChannelName ?? '';
};
