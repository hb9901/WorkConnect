import { CHAT_TYPE } from '@/constants/chat';
import { Tables, TablesInsert } from './supabase';

export type ChatType = {
  type: keyof typeof CHAT_TYPE;
} & Omit<Tables<'chat'>, 'type'>;

export type ChatInsertType = TablesInsert<'chat'>;

export type ChatSubscribePayloadProps = ChatInsertType & Pick<ChatType, 'created_at'>;

export type GetChatMessagesProps = Pick<ChatType, 'channel_id'>;

export type CreateChatMessageProps = Pick<
  ChatType,
  'channel_id' | 'workspace_user_id' | 'content' | 'type' | 'is_notice'
>;

export type GetChatMessageType = Pick<
  ChatType,
  'type' | 'is_notice' | 'id' | 'created_at' | 'content' | 'workspace_user_id'
>;

export type GetChatMessagesResponse = GetChatMessageType[];
