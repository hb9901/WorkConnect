import type { Database } from '@/types/supabase';
import { supabase } from '@/utils/supabase/supabaseClient';

type RealtimeSubscribeProps = {
  channelName: string;
  eventHandlers: {
    event: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
    schema: 'public';
    table: keyof Database['public']['Tables'];
    filter?: string;
    handler: (payload?: any) => void;
  }[];
};

const createRealtimeSubscription = ({ channelName, eventHandlers }: RealtimeSubscribeProps) => {
  const channel = supabase.channel(channelName);

  eventHandlers.forEach(({ handler, ...config }) => {
    // @ts-ignore
    channel.on('postgres_changes', config, handler);
  });

  channel.subscribe();

  return () => {
    channel.unsubscribe();
  };
};

export default createRealtimeSubscription;
