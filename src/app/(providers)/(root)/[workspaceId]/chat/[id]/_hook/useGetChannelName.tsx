import { useParams } from 'next/navigation';
import { useGetUsersInChannel, useGetGroupChannelName } from '../../_hooks/useQueryChat';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import { getDmChannelName } from '../../_utils/getChannelName';

export const useGetChannelName = () => {
  const { id } = useParams();
  const workspaceUserId = useWorkspaceUserId();
  const stringId = Array.isArray(id) ? id[0] : id;

  const { data: groupChannelName, isPending: isPendingGroupChannelName } = useGetGroupChannelName({ id: stringId });

  const { data: usersInChannel = {}, isPending: isPendingUsersInChannel } = useGetUsersInChannel({
    channel_id: Number(stringId),
    workspace_user_id: workspaceUserId
  });

  if (isPendingGroupChannelName || isPendingUsersInChannel) return '';
  const dmChannelName = getDmChannelName(usersInChannel);

  return dmChannelName ?? groupChannelName ?? '';
};
