import api from '@/api/api';
import { Tables } from '@/types/supabase';
import { useMutation, useQuery } from '@tanstack/react-query';

const FAKE_WORKSPACE_USER_ID = '9f144ad8-59c1-4da1-be3d-e9e1c207eddb';

const useWorkspaceUser = () => {
  const {
    data: workspaceUser,
    isPending,
    isError
  } = useQuery({
    queryKey: ['workspaceUser'],
    queryFn: () => api.workspaceUser.getWorkspaceUser(FAKE_WORKSPACE_USER_ID)
  });

  const { mutateAsync: updateWorkspaceUser } = useMutation({
    mutationFn: (workspaceUser: Tables<'workspace_user'>) => api.workspaceUser.updateWorkspaceUser(workspaceUser)
  });
  return { workspaceUser, isPending, isError, updateWorkspaceUser };
};

export default useWorkspaceUser;
