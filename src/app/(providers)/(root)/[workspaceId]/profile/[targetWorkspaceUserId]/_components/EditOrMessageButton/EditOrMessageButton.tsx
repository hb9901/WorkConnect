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
  workspaceId: string;
}

const EditOrMessageButton = ({
  isMyPage,
  targetWorkspaceUserId,
  workspaceUserId,
  workspaceId
}: EditOrMessageButtonProsp) => {
  const { createChannel } = useChannel({ type: 'chat', workspace_id: Number(workspaceUserId) });
  const router = useRouter();

  const handleClick = async () => {
    if (isMyPage) {
      router.push('/profile/edit');
    }
    if (!(workspaceUserId && targetWorkspaceUserId)) return;

    const existChannel = await api.channel.getExistingChannelId({
      other_workspace_user_id: targetWorkspaceUserId,
      workspace_user_id: workspaceUserId
    });

    if (existChannel) {
      router.push(`/chat/${existChannel}`);
      return;
    } else {
      const newChannel: ChannelInsertType = {
        name: '1대1 채팅',
        type: 'chat',
        workspace_id: Number(workspaceId)
      };
      const response = await createChannel(newChannel);
      const channelId = Number(response.id);
      const channelUsersInfo = { workspaceUserIds: [workspaceId, workspaceUserId], channel_id: channelId };
      await api.channelUser.createChannelUsers(channelUsersInfo);
      router.push(`/chat/${channelId}`);
    }
  };

  return (
    <Button theme="primary" isFullWidth={true} onClick={handleClick}>
      {isMyPage ? '' : <MessageCircleIcon />}
      {isMyPage ? '프로필 편집' : '메시지 보내기'}
    </Button>
  );
};

export default EditOrMessageButton;
