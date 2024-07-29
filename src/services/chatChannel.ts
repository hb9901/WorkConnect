import type { GetChatChannelsProps } from '@/types/channel';
import { createClient } from '@/utils/supabase/supabaseServer';

export const getChatChannels = async ({ workspace_id, workspace_user_id }: GetChatChannelsProps) => {
  const supabase = createClient();

  const response = await supabase.rpc('get_chat_channels', {
    wid: workspace_id,
    wuid: workspace_user_id
  });

  return response;
};
