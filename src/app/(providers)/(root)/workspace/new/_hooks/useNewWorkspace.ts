import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation } from '@tanstack/react-query';

type CreateWorkspaceProps = {
  orgName: string;
  combinedNumber: number;
};

export const useCreateWorkspace = ({ ...options }) => {
  return useMutation({
    mutationFn: async ({ orgName, combinedNumber }: CreateWorkspaceProps) => {
      const { data, error } = await supabase
        .from('workspace')
        .insert({
          name: orgName,
          invite_code: combinedNumber
        })
        .select('id')
        .maybeSingle();

      if (error) throw error;

      return data?.id;
    },
    ...options
  });
};

/** @deprecated */
export const useSingleWorkspaceId = ({ ...options }) => {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('workspace')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;

      return data.id;
    },
    ...options
  });
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
/**
 * 회원가입을 하면 기본적으로 처음에 workspace_user 가 하나 생성되기에 해당 상황에서는 update를 시킨다.
 */
export const useUpdateNewWorkspaceUser = ({ ...options }) => {
  return useMutation({
    mutationFn: async ({ workspaceId, userId }: UpdateWorkspaceUserProps) => {
      const { data, error } = await supabase
        .from('workspace_user')
        .update({ workspace_id: workspaceId })
        .eq('user_id', userId)
        .select('id')
        .maybeSingle();

      if (error) throw error;

      return data?.id;
    },
    ...options
  });
};

export const useNewWorkspaceUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('workspace_user')
    .select('id')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;

  return data.id;
};
