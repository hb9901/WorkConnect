import { Tables } from './supabase';

export type ChannelUserType = Tables<'channel_user'>;

export type CreateChannelUsersProps = {
  workspaceUserIds: ChannelUserType['workspace_user_id'][];
} & Pick<ChannelUserType, 'channel_id'>;
