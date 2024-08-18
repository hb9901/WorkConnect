import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation } from '@tanstack/react-query';

export const useGetWorkspaceIdWithInviteCode = ({ ...options }) => {
  return useMutation({
    mutationFn: async (inviteCode: string) => {
      const { data, error } = await supabase
        .from('workspace')
        .select('id')
        .eq('invite_code', Number(inviteCode))
        .single();

      if (error) throw error;
      return data.id;
    },
    ...options
  });
};

type ExWorkspaceUserProps = {
  workspaceId: number;
  userId: string;
};
/** 중복된 초대코드를 입력 했을 시 처리 */
export const useExistingWorkspaceUser = () => {
  return useMutation({
    mutationFn: async ({ workspaceId, userId }: ExWorkspaceUserProps) => {
      const { data } = await supabase
        .from('workspace_user')
        .select('id')
        .eq('workspace_id', workspaceId)
        .eq('user_id', userId)
        .single();

      return data;
    }
  });
};

type InsertWorkspaceUserProps = {
  workspaceId: number;
  userId: string;
  userName: string;
  userEmail: string;
};

export const useInsertWorkspaceUser = ({ ...options }) => {
  return useMutation({
    mutationFn: async ({ workspaceId, userId, userName, userEmail }: InsertWorkspaceUserProps) => {
      const { data, error } = await supabase
        .from('workspace_user')
        .insert({
          workspace_id: workspaceId,
          user_id: userId,
          name: userName,
          email: userEmail
        })
        .select('id')
        .maybeSingle();

      if (error) throw error;

      return data?.id;
    },
    ...options
  });
};

type UpdateWorkspaceUserProps = {
  workspaceId: number;
  userId: string;
};

export const useUpdateWorkspaceUser = ({ ...options }) => {
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

type GetWorkspaceIdProps = { userId: string };

export const useGetWorkspaceId = ({ ...options }) => {
  return useMutation({
    mutationFn: async ({ userId }: GetWorkspaceIdProps) => {
      const { data, error } = await supabase
        .from('workspace_user')
        .select('workspace_id, id')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;

      return { workspaceId: data.workspace_id, workspaceUserId: data.id };
    },
    ...options
  });
};
