import { CHANNEL_TYPE } from '@/constants/channel';
import type { ChatType } from './chat';
import type { WorkspaceUserType } from './workspaceUser';
import type { Tables, TablesInsert } from './supabase';

// `channel` 테이블의 Row 타입
export type ChannelType = {
  type: keyof typeof CHANNEL_TYPE;
} & Omit<Tables<'channel'>, 'type'>;

// `channel` 테이블의 Insert 타입
export type ChannelInsertType = Pick<
  TablesInsert<'channel'>,
  'name' | 'type' | 'workspace_id' | 'host_id' | 'thumbnail'
>;

// `channel` 테이블의 Update 타입
export type ChannelUpdateType = {
  created_at?: string;
  id?: number;
  name?: string | null;
  type?: string | null;
  workspace_id?: number | null;
};

export type GetChatChannelsProps = Pick<ChannelType, 'workspace_id'> & Pick<ChatType, 'workspace_user_id'>;

export type GetChatChannelsResponse = {
  channel_id: ChannelType['id'];
  channel_name: ChannelType['name'];
  message_created_at: ChatType['created_at'];
  message: ChatType['content'];
  user_name: WorkspaceUserType['name'];
  user_state: WorkspaceUserType['state'];
  user_thumbnail: WorkspaceUserType['profile_image'];
  workspace_user_id: WorkspaceUserType['id'];
  is_dm: boolean;
  user_count: number;
  type: ChannelType['type'];
  created_at: string;
};

export type GetUsersInChannelRequestProps = {
  channel_id: ChannelType['id'];
};

export type GetUsersInChannelResponseItem = {
  workspace_user_id: WorkspaceUserType['id'];
  name: WorkspaceUserType['name'];
  profile_image: WorkspaceUserType['profile_image'];
};

export type GetUsersInChannelResponse = Record<WorkspaceUserType['id'], GetUsersInChannelResponseItem>;

export type GetExistingChannelIdRequestProps = {
  workspace_user_id: WorkspaceUserType['id'];
  other_workspace_user_id: WorkspaceUserType['id'];
};
