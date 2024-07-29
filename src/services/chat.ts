import { CHAT_TYPE } from '@/constants/chat';
import type { CreateChatMessageProps, GetChatMessagesProps } from '@/types/chat';
import { createClient } from '@/utils/supabase/supabaseServer';

export const getChatMessages = async ({ channel_id }: GetChatMessagesProps) => {
  const supabase = createClient();

  const response = await supabase.rpc('get_chat_messages', {
    cid: channel_id
  });

  return response;
};

export const createChatMessage = async ({
  channel_id,
  workspace_user_id,
  content,
  type = CHAT_TYPE.text,
  is_notice = false
}: CreateChatMessageProps) => {
  const supabase = createClient();

  const response = await supabase.from('chat').insert({
    channel_id: Number(channel_id),
    workspace_user_id,
    content,
    type,
    is_notice
  });

  return response;
};
