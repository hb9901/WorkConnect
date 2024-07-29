import type { GetChatMessageType } from '@/types/chat';
import { ChatContainer, ChatImage, ChatMessage, ChatOtherProfileContainer, ChatOtherProfileName } from '../Chat';
import type { GetUsersInChannelResponse } from '@/types/channel';

// TODO: 임시 코드
const WORKSPACE_USER_ID = '2b5cc93d-1353-4adb-a8c5-60855dc4e5a2';

type ChatMessagesProps = {
  data: GetChatMessageType[] & { channel_id?: string };
  usersInChannel: GetUsersInChannelResponse;
};

const ChatMessages = ({ data = [], usersInChannel = {} }: ChatMessagesProps) => {
  return (
    <>
      {data.map((chat) => {
        const userInfo = usersInChannel[chat.workspace_user_id];
        const isMe = chat.workspace_user_id === WORKSPACE_USER_ID;

        return (
          <ChatContainer key={chat.id} className={`flex ${isMe ? 'items-end' : 'items-start'} flex-col`}>
            {!isMe && (
              <ChatOtherProfileContainer>
                <ChatImage
                  src={
                    userInfo.profile_image ??
                    'https://blog.kakaocdn.net/dn/bCXLP7/btrQuNirLbt/N30EKpk07InXpbReKWzde1/img.png'
                  }
                />
                <ChatOtherProfileName>{userInfo.name}</ChatOtherProfileName>
              </ChatOtherProfileContainer>
            )}
            <ChatMessage className={isMe ? 'bg-blue-500' : 'bg-gray-600 ml-[50px]'}>{chat.content}</ChatMessage>
          </ChatContainer>
        );
      })}
    </>
  );
};

export default ChatMessages;
