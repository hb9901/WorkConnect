import { REALTIME_CHANNEL_NAME } from '@/constants/realtime';
import createRealtimeChannel from '@/utils/createRealtimeChannel';

type SubscribeToChannelsProps = {
  handleChatInserts: (payload: any) => void;
  handleChannelUserUpdates: (payload: any) => void;
  channelIds: string;
  workspaceUserId: string;
};

export const handleSubscribeToChannels = ({
  handleChatInserts,
  channelIds,
  handleChannelUserUpdates
}: SubscribeToChannelsProps) => {
  return createRealtimeChannel({
    channelName: REALTIME_CHANNEL_NAME.CHANNEL_LIST,
    eventHandlers: [
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat',
        filter: `channel_id=in.(${channelIds})`,
        handler: handleChatInserts
      },
      {
        event: '*',
        schema: 'public',
        table: 'channel_user',
        filter: `channel_id=in.(${channelIds})`,
        handler: handleChannelUserUpdates
      }
    ]
  });
};
