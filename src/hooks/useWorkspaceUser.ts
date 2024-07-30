import api from '@/api/api';
import { Tables } from '@/types/supabase';
import { useMutation, useQuery } from '@tanstack/react-query';

const useWorkspaceUser = (userId: string) => {
  const {
    data: workspaceUser,
    isPending,
    isError
  } = useQuery({
    queryKey: ['workspaceUser'],
    queryFn: () => api.workspaceUser.getWorkspaceUser(userId)
  });

  const { mutateAsync: updateWorkspaceUser } = useMutation({
    mutationFn: (workspaceUser: Partial<Tables<'workspace_user'>>) =>
      api.workspaceUser.updateWorkspaceUser(workspaceUser)
  });
  return { workspaceUser, isPending, isError, updateWorkspaceUser };
};

export default useWorkspaceUser;
