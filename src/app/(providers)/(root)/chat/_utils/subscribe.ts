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
          event: 'INSERT',
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
  id: string;
};

export const subscribeToChat =
  ({ handleInserts, id }: SubscribeToChatProps) =>
  () => {
    return createRealtimeSubscription({
      channelName: `chat_${id}`,
      eventHandlers: [
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat',
          filter: `channel_id=eq.${id}`,
          handler: handleInserts
        }
      ]
    });
  };
