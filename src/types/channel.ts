import { CHANNEL_TYPE } from '@/constants/channel';
import { Tables } from './supabase';

// `channel` 테이블의 Row 타입
export type ChannelType = {
  type: keyof typeof CHANNEL_TYPE;
} & Omit<Tables<'channel'>, 'type'>;

// `channel` 테이블의 Insert 타입
export type ChannelInsertType = Pick<ChannelType, 'name' | 'type' | 'workspace_id' | 'host_id'>;

// `channel` 테이블의 Update 타입
export type ChannelUpdateType = {
  created_at?: string;
  id?: number;
  name?: string | null;
  type?: string | null;
  workspace_id?: number | null;
};
