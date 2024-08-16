import api from '@/api/api';
import { Tables } from '@/types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useWorkspaceUser = (workspaceUserId: string | null) => {
  const queryClient = useQueryClient();
  const {
    data: workspaceUser,
    isPending,
    isLoading,
    isError
  } = useQuery<Tables<'workspace_user'> | undefined>({
    queryKey: ['workspaceUser', workspaceUserId],
    queryFn: () => {
      if (!workspaceUserId) return;
      return api.workspaceUser.getWorkspaceUser(workspaceUserId);
    },
    enabled: !!workspaceUserId
  });

  const { mutateAsync: updateWorkspaceUser } = useMutation({
    mutationFn: (workspaceUser: Partial<Tables<'workspace_user'>>) =>
      api.workspaceUser.updateWorkspaceUser(workspaceUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaceUser', workspaceUserId] });
    }
  });

  return { workspaceUser, isPending, isLoading, isError, updateWorkspaceUser };
};

export default useWorkspaceUser;
