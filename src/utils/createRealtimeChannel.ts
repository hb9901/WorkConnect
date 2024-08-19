import type { Database } from '@/types/supabase';
import { supabase } from '@/utils/supabase/supabaseClient';

export type RealtimeSubscribeProps = {
  channelName: string;
  eventHandlers: {
    event: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
    schema: 'public';
    table: keyof Database['public']['Tables'];
    filter?: string;
    handler: (payload?: any) => void;
  }[];
};

const createRealtimeChannel = ({ channelName, eventHandlers }: RealtimeSubscribeProps) => {
  const channel = supabase.channel(channelName);

  eventHandlers.forEach(({ handler, ...config }) => {
    // @ts-ignore
    channel.on('postgres_changes', config, handler);
  });

  return channel;
};

export default createRealtimeChannel;
