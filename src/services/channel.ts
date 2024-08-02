import type {
  ChannelInsertType,
  GetExistingChannelIdRequestProps,
  GetUsersInChannelRequestProps,
  GetUsersInChannelResponse,
  GetUsersInChannelResponseItem
} from '@/types/channel';
import { createClient } from '@/utils/supabase/supabaseServer';

export const createChannel = async ({ name, type, workspace_id, thumbnail }: ChannelInsertType) => {
  const supabase = createClient();

  const response = await supabase
    .from('channel')
    .insert({
      name,
      type,
      workspace_id,
      thumbnail
    })
    .select('id')
    .single();

  return response;
};

export const getUsersInChannel = async ({ channel_id, workspace_user_id }: GetUsersInChannelRequestProps) => {
  const supabase = createClient();

  const response = await supabase.rpc('get_users_in_channel', {
    cid: channel_id,
    wuid: workspace_user_id
  });

  if (!response.data) {
    return response;
  }

  const usersMap = response.data.reduce((acc: GetUsersInChannelResponse, user: GetUsersInChannelResponseItem) => {
    acc[user.workspace_user_id] = user;
    return acc;
  }, {});

  return { ...response, data: usersMap };
};

export const getExistingChannelId = async ({
  workspace_user_id,
  other_workspace_user_id
}: GetExistingChannelIdRequestProps) => {
  const supabase = createClient();

  const response = await supabase.rpc('get_existing_channel_id', {
    my_wuid: workspace_user_id,
    other_wuid: other_workspace_user_id
  });

  return response;
};

export const getChannelName = async ({ id }: { id: string }) => {
  const supabase = createClient();

  const response = await supabase.from('channel').select('name').eq('id', id).single();

  return response;
};
