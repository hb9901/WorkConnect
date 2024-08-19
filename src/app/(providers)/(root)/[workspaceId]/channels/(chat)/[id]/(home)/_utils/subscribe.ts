import { REALTIME_CHANNEL_NAME } from '@/constants/realtime';
import createRealtimeChannel from '@/utils/createRealtimeChannel';

type SubscribeToChatProps = {
  handleMessagesUpdates: (payload: any) => void;
  handleUserInfoUpdates: () => void;
  id: number;
  userIds: string;
};

export const handleSubscribeToChat = ({
  handleMessagesUpdates,
  handleUserInfoUpdates,
  id,
  userIds
}: SubscribeToChatProps) => {
  return createRealtimeChannel({
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
        handler: handleUserInfoUpdates
      }
    ]
  });
};

export const handleSubscribeToNotice = ({ handler, id }: { handler: (payload: any) => void; id: number }) => {
  return createRealtimeChannel({
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
