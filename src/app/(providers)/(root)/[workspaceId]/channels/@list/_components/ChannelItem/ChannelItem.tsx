import { CHANNEL_TYPE } from '@/constants/channel';
import ChatCard from '@/components/ChatCard/ChatCard';
import Link from 'next/link';
import { ComponentProps } from 'react';
import dayjs from 'dayjs';
import Avatar from '@/components/Avatar';
import { GetChannelsResponse } from '@/types/channel';
import VideoChatAvatar from '@/components/VideoChatAvatar';

type ChannelListImageProps = Pick<ComponentProps<'img'>, 'src'> & {
  type: keyof typeof CHANNEL_TYPE;
};

type ChannelItemProps = {
  href: string;
  user_count: number | undefined;
  user_thumbnail: string | undefined;
  name: string;
  user_state: GetChannelsResponse['user_state'];
  message: GetChannelsResponse['message'];
  type: GetChannelsResponse['type'];
  created_at: GetChannelsResponse['created_at'];
};

const ChannelItem = ({
  message,
  user_state,
  user_thumbnail,
  href,
  type,
  created_at,
  name,
  user_count
}: ChannelItemProps) => {
  return (
    <Link href={href}>
      <ChatCard
        date={dayjs(created_at).format('YYYY-MM-DD')}
        icon={<ChannelImage type={type} src={user_thumbnail} />}
        message={message}
        name={name}
        status={user_state}
        userCount={user_count}
      />
    </Link>
  );
};

const ChannelImage = ({ src = '', type }: ChannelListImageProps) => {
  if (type === CHANNEL_TYPE.video) {
    return <VideoChatAvatar size="40px" />;
  }

  return <Avatar src={src} size="40px" />;
};

export default ChannelItem;
