import { ChannelUserType } from '@/types/channelUser';
import { createClient } from '@/utils/supabase/supabaseServer';

type CreateChannelUsersProps = {
  workspaceUserIds: ChannelUserType['workspace_user_id'][];
} & Pick<ChannelUserType, 'channel_id'>;

export const createChannelUsers = async ({ workspaceUserIds, channel_id }: CreateChannelUsersProps) => {
  const supabase = createClient();

  const bulkData = workspaceUserIds.map((userId) => ({
    workspace_user_id: userId,
    channel_id
  }));

  const response = await supabase.from('channel_user').insert(bulkData);

  return response;
};
