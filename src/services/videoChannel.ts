import { supabase } from '@/utils/supabase/supabaseClient';

const channel = supabase.from('channel');

export const getVideoChannelList = async () => {
  const response = await channel.select('*').eq('type', 'video');
  return response.data;
};

export const createVideoChannel = async (name: string) => {
  await channel.insert({
    name: name,
    type: 'video',
    workspace_id: 2
  });
};

export const deleteVideoChannel = async (name: string) => {
  await channel.delete().eq('name', name);
};
