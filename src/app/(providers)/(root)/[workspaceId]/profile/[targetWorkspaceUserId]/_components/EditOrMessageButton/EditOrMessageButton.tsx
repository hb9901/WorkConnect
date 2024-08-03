import api from '@/api';
import Button from '@/components/Button';
import useChannel from '@/hooks/useChannel';
import MessageCircleIcon from '@/icons/MessageCircle.svg';
import { ChannelInsertType } from '@/types/channel';
import { useRouter } from 'next/navigation';

interface EditOrMessageButtonProsp {
  isMyPage: boolean;
  targetWorkspaceUserId: string;
  workspaceUserId: string | null;
  workspaceId: number;
}

const EditOrMessageButton = ({
  isMyPage,
  targetWorkspaceUserId,
  workspaceUserId,
  workspaceId
}: EditOrMessageButtonProsp) => {
  const { createChannel } = useChannel({ type: 'chat', workspace_id: workspaceId });
  const router = useRouter();

  const handleEditClick = async () => {
    router.push(`/${workspaceId}/profile/${workspaceUserId}/edit`);
  };

  const handleMessageClick = async () => {
    if (!(workspaceUserId && targetWorkspaceUserId)) return;

    const existChannel = await api.channel.getExistingChannelId({
      other_workspace_user_id: targetWorkspaceUserId,
      workspace_user_id: workspaceUserId
    });

    if (existChannel) {
      router.push(`/${workspaceId}/chat/${existChannel}`);
      return;
    } else {
      const newChannel: ChannelInsertType = {
        name: '1대1 채팅',
        type: 'chat',
        workspace_id: workspaceId
      };
      const response = await createChannel(newChannel);
      const channelId = Number(response.id);
      const channelUsersInfo = { workspaceUserIds: [targetWorkspaceUserId, workspaceUserId], channel_id: channelId };
      await api.channelUser.createChannelUsers(channelUsersInfo);
      router.push(`/${workspaceId}/chat/${channelId}`);
    }
  };

  return (
    <Button theme="primary" isFullWidth={true} onClick={isMyPage ? handleEditClick : handleMessageClick}>
      {isMyPage ? '' : <MessageCircleIcon className="stroke-white" />}
      {isMyPage ? '프로필 편집' : '메시지 보내기'}
    </Button>
  );
};

export default EditOrMessageButton;
