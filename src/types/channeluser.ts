export type InsertChannelUserType = {
  channel_id: number;
  created_at?: string;
  id?: number;
  last_read_chat_id?: number | null;
  user_id: string;
  workspace_user_id?: string | null;
};
