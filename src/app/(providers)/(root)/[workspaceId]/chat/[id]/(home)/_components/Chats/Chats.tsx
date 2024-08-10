import type { GetChatMessageType } from '@/types/chat';
import { ChatMessage } from '../Chat';
import type { GetUsersInChannelResponse } from '@/types/channel';
import Link from 'next/link';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import { useParams } from 'next/navigation';
import { isEmpty } from '@/utils/isEmpty';
import Avatar from '@/components/Avatar';
import Typography from '@/components/Typography';
import { memo } from 'react';
import { useContextMenu } from '../../_provider/ContextMenuProvider';

type ChatMessagesProps = {
  data: GetChatMessageType[] & { channel_id?: string };
  usersInChannel: GetUsersInChannelResponse;
};

// TODO: video onLoad event 가 있으면 모두 다 로딩된 후에 스크롤을 가장 아래로 내리도록 수정

const Chats = ({ data = [], usersInChannel = {} }: ChatMessagesProps) => {
  const { id: channelId } = useParams();
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useWorkspaceUserId();
  const { openContextMenu } = useContextMenu();

  const noticeUrl = `/${workspaceId}/chat/${channelId}/notice`;

  if (isEmpty(usersInChannel)) return null;

  return (
    <>
      {data.map((chat) => {
        const userInfo = usersInChannel[chat.workspace_user_id];
        const isMe = chat.workspace_user_id === workspaceUserId;
        const profileUrl = `/${workspaceId}/profile/${chat.workspace_user_id}`;

        return (
          <div key={chat.id} className={`flex ${isMe ? 'items-end' : 'items-start'} flex-col`}>
            {!isMe && (
              <OtherProfile profileImage={userInfo?.profile_image} name={userInfo?.name} profileUrl={profileUrl} />
            )}
            <ChatMessage
              content={chat.content}
              type={chat.type}
              id={chat.id}
              isMe={isMe}
              noticeUrl={noticeUrl}
              openContextMenu={openContextMenu}
            />
          </div>
        );
      })}
    </>
  );
};

type OtherProfileProps = {
  profileImage: string | null;
  name: string;
  profileUrl: string;
};

const OtherProfile = memo(({ profileImage, name, profileUrl }: OtherProfileProps) => {
  return (
    <Link href={profileUrl} className="flex items-center gap-2">
      <Avatar src={profileImage ?? undefined} size="32px" />
      <Typography variant="Title16px" color="grey900">
        {name}
      </Typography>
    </Link>
  );
});

export default Chats;
