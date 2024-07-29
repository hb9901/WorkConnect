import api from '@/api/api';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

const useWorkspaceUserList = (workspaceId: number) => {
  const {
    data: workspaceUserList,
    isPending,
    isError
  } = useQuery<Tables<'workspace_user'>[]>({
    queryKey: ['workspaceUserList', workspaceId],
    queryFn: () => api.workspaceUserList.getWorkspaceUserList(workspaceId)
  });

  return { workspaceUserList, isPending, isError };
};

export default useWorkspaceUserList;
