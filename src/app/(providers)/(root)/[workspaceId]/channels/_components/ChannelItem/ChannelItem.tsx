import { CHANNEL_TYPE } from '@/constants/channel';
import ChatCard from '@/components/ChatCard/ChatCard';
import Link from 'next/link';
import { ComponentProps } from 'react';
import dayjs from 'dayjs';
import Avatar from '@/components/Avatar';
import { GetChannelsResponse } from '@/types/channel';
import VideoChatAvatar from '@/components/VideoChatAvatar';
import clsx from 'clsx';

type ChannelItemProps = {
  isActive: boolean;
  href: string;
  user_count: number | undefined;
  channel_thumbnail: string | undefined;
  name: string;
} & Pick<GetChannelsResponse, 'message' | 'type' | 'user_state' | 'created_at' | 'un_read_chat'>;

const ChannelItem = ({
  isActive,
  message,
  user_state,
  channel_thumbnail,
  href,
  type,
  created_at,
  name,
  user_count,
  un_read_chat
}: ChannelItemProps) => {
  return (
    <Link href={href} className={clsx('block lg:hover:bg-primary25', isActive && 'bg-primary25')}>
      <ChatCard
        date={dayjs(created_at).format('YYYY-MM-DD')}
        icon={<ChannelImage type={type} src={channel_thumbnail} />}
        message={message}
        name={name}
        status={user_state}
        userCount={user_count}
        unreadCount={un_read_chat}
      />
    </Link>
  );
};

type ChannelListImageProps = Pick<ComponentProps<'img'>, 'src'> & {
  type: keyof typeof CHANNEL_TYPE;
};

const ChannelImage = ({ src = '', type }: ChannelListImageProps) => {
  if (type === CHANNEL_TYPE.video) {
    return <VideoChatAvatar size="40px" />;
  }

  return <Avatar src={src} size="40px" />;
};

export default ChannelItem;
