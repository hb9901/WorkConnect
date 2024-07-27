import type { ChannelInsertType } from "@/types/channel";
import { createClient } from "@/utils/supabase/supabaseServer";

export const createChannel = async ({ name, type, workspace_id }: ChannelInsertType) => {
  const supabase = createClient();

  const response = await supabase.from('channel').insert({
    name,
    type,
    workspace_id
  }).select('id').single();

  return response;
};