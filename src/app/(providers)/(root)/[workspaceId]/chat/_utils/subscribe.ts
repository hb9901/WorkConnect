import createRealtimeSubscription from '@/utils/createRealtimeSubscription';
import { REALTIME_CHANNEL_NAME } from '../_constants/constants';

type SubscribeToChannelsProps = {
  handleChatInserts: (payload: any) => void;
  handleChannelUserUpdates: (payload: any) => void;
  channelIds: string;
  workspaceUserId: string;
};

export const handleSubscribeToChannels = ({
  handleChatInserts,
  channelIds,
  handleChannelUserUpdates,
  workspaceUserId
}: SubscribeToChannelsProps) => {
  return createRealtimeSubscription({
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
        filter: `workspace_user_id=eq.${workspaceUserId}`,
        handler: handleChannelUserUpdates
      }
    ]
  });
};

type SubscribeToChatProps = {
  handleMessagesUpdates: (payload: any) => void;
  handleUserUpdates: () => void;
  id: string;
  userIds: string;
};

export const handleSubscribeToChat = ({
  handleMessagesUpdates,
  handleUserUpdates,
  id,
  userIds
}: SubscribeToChatProps) => {
  return createRealtimeSubscription({
    channelName: REALTIME_CHANNEL_NAME.CHAT,
    eventHandlers: [
      {
        event: '*',
        schema: 'public',
        table: 'chat',
        filter: `channel_id=eq.${id}`,
        handler: handleMessagesUpdates
      },
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'workspace_user',
        filter: `id=in.(${userIds})`,
        handler: handleUserUpdates
      }
    ]
  });
};

export const handleSubscribeToNotice = ({ handler, id }: { handler: (payload: any) => void; id: string }) => {
  return createRealtimeSubscription({
    channelName: REALTIME_CHANNEL_NAME.CHAT_FOR_NOTICE,
    eventHandlers: [
      {
        event: '*',
        schema: 'public',
        table: 'chat',
        filter: `channel_id=eq.${id}`,
        handler
      }
    ]
  });
};
