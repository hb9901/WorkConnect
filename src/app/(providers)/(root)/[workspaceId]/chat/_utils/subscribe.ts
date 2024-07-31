import createRealtimeSubscription from '@/utils/createRealtimeSubscription';

type SubscribeToChannelsProps = {
  handleChatInserts: (payload: any) => void;
  handleChannelUserInserts: (payload: any) => void;
  channelIds: string;
  workspace_user_id: string;
};

export const subscribeToChannels =
  ({ handleChatInserts, channelIds, handleChannelUserInserts, workspace_user_id }: SubscribeToChannelsProps) =>
  () => {
    if (!channelIds) return;

    return createRealtimeSubscription({
      channelName: 'chat_channel',
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
          filter: `workspace_user_id=eq.${workspace_user_id}`,
          handler: handleChannelUserInserts
        }
      ]
    });
  };

type SubscribeToChatProps = {
  handleInserts: (payload: any) => void;
  handleUserUpdates: () => void;
  id: string;
  userIds: string;
};

export const subscribeToChat =
  ({ handleInserts, handleUserUpdates, id, userIds }: SubscribeToChatProps) =>
  () => {
    if (!userIds) return;

    return createRealtimeSubscription({
      channelName: `chat_${id}`,
      eventHandlers: [
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat',
          filter: `channel_id=eq.${id}`,
          handler: handleInserts
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
