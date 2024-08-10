import { CHANNEL_TYPE } from '@/constants/channel';
import ChatCard from '@/components/ChatCard/ChatCard';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { AirPlayIcon } from '@/icons';
import dayjs from 'dayjs';
import Avatar from '@/components/Avatar';
import { GetChannelsResponse } from '@/types/channel';

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
    return (
      <div className="w-[40px] h-[40px] flex items-center justify-center bg-primary200Main rounded-full">
        <AirPlayIcon className="w-[20px] h-[20px] text-white stroke-current" />
      </div>
    );
  }

  return <Avatar src={src} size="40px" />;
};

export default ChannelItem;
