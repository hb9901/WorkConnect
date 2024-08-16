import api from '@/api/api';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

const useWorkspaceUserList = (workspaceId: number, workspaceUserId: string | null) => {
  const {
    data: workspaceUserList,
    isLoading,
    isPending,
    isError
  } = useQuery<Tables<'workspace_user'>[] | undefined>({
    queryKey: ['workspaceUserList' + workspaceId + workspaceUserId],
    queryFn: () => {
      if (!workspaceUserId) return;
      return api.workspaceUserList.getWorkspaceUserList(workspaceId, workspaceUserId);
    },
    enabled: !!workspaceUserId
  });

  return { workspaceUserList, isLoading, isPending, isError };
};

export default useWorkspaceUserList;
