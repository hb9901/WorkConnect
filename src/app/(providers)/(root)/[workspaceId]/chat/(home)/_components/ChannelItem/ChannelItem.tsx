import type { GetChatChannelsResponse } from '@/types/channel';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { CHANNEL_TYPE } from '@/constants/channel';
import ChatCard from '@/components/ChatCard/ChatCard';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { AirPlayIcon } from '@/icons';
import dayjs from 'dayjs';
import Avatar from '@/components/Avatar';

type ChannelListImageProps = Pick<ComponentProps<'img'>, 'src'> & {
  type: keyof typeof CHANNEL_TYPE;
};

const ChannelItem = ({
  channel_name,
  message,
  user_state,
  user_name,
  user_thumbnail,
  user_count,
  is_dm,
  channel_id,
  type,
  created_at
}: GetChatChannelsResponse) => {
  const workspaceId = useWorkspaceId();
  const href =
    type === CHANNEL_TYPE.chat ? `/${workspaceId}/chat/${channel_id}` : `/${workspaceId}/video-channel/${channel_name}`;

  return (
    <Link href={href}>
      <ChatCard
        date={dayjs(created_at).format('YYYY-MM-DD')}
        icon={<ChannelImage type={type} src={user_thumbnail ?? undefined} />}
        message={message}
        name={user_name ?? channel_name}
        status={user_state}
        userCount={is_dm ? undefined : user_count}
      />
    </Link>
  );
};

const ChannelImage = ({ src = '', type }: ChannelListImageProps) => {
  if (type === CHANNEL_TYPE.video) {
    return (
      <div className="w-[40px] h-[40px] flex items-center justify-center bg-primary200Main rounded-full">
        <AirPlayIcon className="w-[20px] h-[20px] text-white stroke-current" />
      </div>
    );
  }

  return <Avatar src={src} size="40px" />;
};

export default ChannelItem;
