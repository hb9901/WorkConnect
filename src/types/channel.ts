import { Tables } from './supabase';

// `channel` 테이블의 Row 타입
export type ChannelType = Tables<'channel'>;

// `channel` 테이블의 Insert 타입
export type ChannelInsertType = {
  created_at?: string;
  id?: number;
  name?: string | null;
  type?: string | null;
  workspace_id?: number | null;
};

// `channel` 테이블의 Update 타입
export type ChannelUpdateType = {
  created_at?: string;
  id?: number;
  name?: string | null;
  type?: string | null;
  workspace_id?: number | null;
};
