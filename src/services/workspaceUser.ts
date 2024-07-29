import type { GetSearchWorkspaceUsersProps } from '@/types/workspaceUser';
import { createClient } from '@/utils/supabase/supabaseServer';

export const getSearchWorkspaceUsers = async ({
  workspace_id,
  term,
  workspace_user_id
}: GetSearchWorkspaceUsersProps) => {
  const supabase = createClient();

  const response = await supabase
    .from('workspace_user')
    .select('profile_image, name, id')
    .ilike('name', `%${term}%`)
    .eq('workspace_id', workspace_id!)
    .neq('id', workspace_user_id);

  return response;
};
