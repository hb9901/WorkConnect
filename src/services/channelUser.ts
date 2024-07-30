import { ChannelUserType } from '@/types/channelUser';
import { createClient } from '@/utils/supabase/supabaseServer';

type CreateChannelUsersProps = {
  workspaceUserIds: ChannelUserType['workspace_user_id'][];
} & Pick<ChannelUserType, 'channel_id'>;

type DeleteUserInChannelProps = Pick<ChannelUserType, 'workspace_user_id'> & Pick<ChannelUserType, 'channel_id'>;

export const createChannelUsers = async ({ workspaceUserIds, channel_id }: CreateChannelUsersProps) => {
  const supabase = createClient();

  const bulkData = workspaceUserIds.map((userId) => ({
    workspace_user_id: userId,
    channel_id
  }));

  const response = await supabase.from('channel_user').insert(bulkData);

  return response;
};

export const getUserListByChannel = async (channel_id: number) => {
  const supabase = createClient();

  const response = await supabase.from('channel_user').select('*').eq('channel_id', channel_id);
  return response;
};

//
export const deleteUserInChannel = async ({ workspace_user_id, channel_id }: DeleteUserInChannelProps) => {
  const supabase = createClient();

  const response = await supabase
    .from('channel_user')
    .delete()
    .eq('channel_id', channel_id)
    .eq('workspace_user_id', workspace_user_id);

  return response;
};
