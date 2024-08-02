import type { GetChatMessageType } from '@/types/chat';
import { ChatContainer, ChatThumbnail, ChatMessage, ChatOtherProfileContainer, ChatOtherProfileName } from '../Chat';
import type { GetUsersInChannelResponse } from '@/types/channel';
import Link from 'next/link';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';

type ChatMessagesProps = {
  data: GetChatMessageType[] & { channel_id?: string };
  usersInChannel: GetUsersInChannelResponse;
};

// TODO: video onLoad event 가 있으면 모두 다 로딩된 후에 스크롤을 가장 아래로 내리도록 수정

const ChatMessages = ({ data = [], usersInChannel = {} }: ChatMessagesProps) => {
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useWorkspaceUserId();

  if (Object.keys(usersInChannel).length === 0) return null;

  return (
    <>
      {data.map((chat) => {
        const userInfo = usersInChannel[chat.workspace_user_id];
        const isMe = chat.workspace_user_id === workspaceUserId;

        return (
          <ChatContainer key={chat.id} className={`flex ${isMe ? 'items-end' : 'items-start'} flex-col`}>
            {!isMe && (
              <ChatOtherProfileContainer as={Link} href={`/${workspaceId}/profile/${chat.workspace_user_id}`}>
                <ChatThumbnail
                  src={
                    userInfo?.profile_image ??
                    'https://blog.kakaocdn.net/dn/bCXLP7/btrQuNirLbt/N30EKpk07InXpbReKWzde1/img.png'
                  }
                  width={32}
                  height={32}
                />
                <ChatOtherProfileName>{userInfo?.name}</ChatOtherProfileName>
              </ChatOtherProfileContainer>
            )}
            <ChatMessage content={chat.content} type={chat.type} id={chat.id} isMe={isMe} />
          </ChatContainer>
        );
      })}
    </>
  );
};

export default ChatMessages;
