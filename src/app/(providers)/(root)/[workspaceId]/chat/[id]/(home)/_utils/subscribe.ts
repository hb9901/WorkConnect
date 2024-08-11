import { REALTIME_CHANNEL_NAME } from '@/constants/realtime';
import createRealtimeSubscription from '@/utils/createRealtimeSubscription';

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
