import { CHAT_TYPE } from '@/constants/chat';
import type { ChatType, GetChatMessagesProps, GetLatestNoticeProps } from '@/types/chat';
import { createClient } from '@/utils/supabase/supabaseServer';
import * as Sentry from '@sentry/node';

export const getChatMessages = async ({ channel_id }: GetChatMessagesProps) => {
  const supabase = createClient();

  const response = await supabase.rpc('get_chat_messages', {
    cid: channel_id
  });

  return response;
};

type CreateChatMessageProps = Pick<ChatType, 'channel_id' | 'content' | 'type' | 'workspace_user_id'>;

export const createChatMessage = async ({
  channel_id,
  workspace_user_id,
  content,
  type = CHAT_TYPE.text
}: CreateChatMessageProps) => {
  const supabase = createClient();

  const response = await supabase.from('chat').insert({
    channel_id: Number(channel_id),
    workspace_user_id,
    content,
    type
  });

  return response;
};

export const getLatestNotice = async ({ channel_id }: GetLatestNoticeProps) => {
  const supabase = createClient();

  const response = await supabase
    .from('chat')
    .select('*')
    .eq('channel_id', channel_id)
    .eq('type', 'notice')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return response;
};

export const getChannelDocuments = async ({ channel_id }: { channel_id: number }) => {
  const supabase = createClient();

  const response = await supabase
    .from('chat')
    .select('*')
    .eq('channel_id', channel_id)
    .eq('type', CHAT_TYPE.document)
    .order('created_at', { ascending: false });

  return response;
};

export const getChannelNotices = async ({ channel_id }: { channel_id: number }) => {
  const supabase = createClient();

  const response = await supabase
    .from('chat')
    .select('*')
    .eq('channel_id', channel_id)
    .eq('type', CHAT_TYPE.notice)
    .order('created_at', { ascending: false });

  return response;
};

export const getChannelMedia = async ({ channel_id }: { channel_id: number }) => {
  const supabase = createClient();

  const response = await supabase
    .from('chat')
    .select('*')
    .eq('channel_id', channel_id)
    .in('type', [CHAT_TYPE.video, CHAT_TYPE.image])
    .order('created_at', { ascending: false });

  return response;
};

export const deleteChatMessage = async (id: number) => {
  const supabase = createClient();

  const response = await supabase.from('chat').delete().eq('id', id);

  Sentry.captureMessage(`@@ Delete response: ${JSON.stringify(response)}`);

  return response;
};
