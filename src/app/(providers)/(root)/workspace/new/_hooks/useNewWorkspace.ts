import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation } from '@tanstack/react-query';

type CreateWorkspaceProps = {
  orgName: string;
  combinedNumber: number;
  adminUserId: string;
};

export const useCreateWorkspace = ({ ...options }) => {
  return useMutation({
    mutationFn: async ({ orgName, combinedNumber, adminUserId }: CreateWorkspaceProps) => {
      const { error } = await supabase.from('workspace').insert({
        name: orgName,
        invite_code: combinedNumber,
        admin_user_id: adminUserId
      });

      if (error) throw error;
    },
    ...options
  });
};

export const useSingleWorkspaceId = async (adminUserId: string) => {
  const { data, error } = await supabase
    .from('workspace')
    .select('id')
    .eq('admin_user_id', adminUserId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;

  return data.id;
};

type CreateWorkspaceUserProps = {
  workspaceId: number;
  userId: string;
  userName: string;
  userEmail: string;
};
export const useCreateWorkspaceUser = ({ ...options }) => {
  return useMutation({
    mutationFn: async ({ workspaceId, userId, userName, userEmail }: CreateWorkspaceUserProps) => {
      const { error } = await supabase.from('workspace_user').insert({
        workspace_id: workspaceId,
        user_id: userId,
        name: userName,
        email: userEmail
      });

      if (error) throw error;
    },
    ...options
  });
};

type UpdateWorkspaceUserProps = {
  workspaceId: number;
  userId: string;
};
export const useUpdateNewWorkspaceUser = ({ ...options }) => {
  return useMutation({
    mutationFn: async ({ workspaceId, userId }: UpdateWorkspaceUserProps) => {
      const { error } = await supabase
        .from('workspace_user')
        .update({ workspace_id: workspaceId })
        .eq('user_id', userId);

      if (error) throw error;
    },
    ...options
  });
};
