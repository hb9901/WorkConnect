import type { GetChatChannelsResponse } from '@/types/channel';
import {
  ChannelListContent,
  ChannelListHeader,
  ChannelListImage,
  ChannelListItem,
  ChannelListMessage,
  ChannelListTitle,
  ChannelListUserState
} from '../ChannelList';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { CHANNEL_TYPE } from '@/constants/channel';

const ChannelItem = ({
  channel_name,
  message,
  user_state,
  user_name,
  user_thumbnail,
  user_count,
  is_dm,
  channel_id,
  type
}: GetChatChannelsResponse) => {
  const workspaceId = useWorkspaceId();
  const href =
    type === CHANNEL_TYPE.chat ? `/${workspaceId}/chat/${channel_id}` : `/${workspaceId}/video-channel/${channel_name}`;

  return (
    <ChannelListItem href={href}>
      <ChannelListImage
        src={user_thumbnail ?? 'https://blog.kakaocdn.net/dn/bCXLP7/btrQuNirLbt/N30EKpk07InXpbReKWzde1/img.png'}
      />
      <ChannelListContent>
        <ChannelListHeader>
          <ChannelListTitle>
            {user_name ?? channel_name}
            <span className="text-xs text-gray-500 ml-2">{is_dm ? '' : `(${user_count})`}</span>
          </ChannelListTitle>
          {user_state && <ChannelListUserState>{user_state}</ChannelListUserState>}
        </ChannelListHeader>
        <ChannelListMessage>{message}</ChannelListMessage>
      </ChannelListContent>
    </ChannelListItem>
  );
};

export default ChannelItem;
