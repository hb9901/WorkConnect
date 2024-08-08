import api from '@/api/api';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

const useWorkspaceUserList = (workspaceId: number, workspaceUserId: string | null) => {
  const {
    data: workspaceUserList,
    isPending,
    isError
  } = useQuery<Tables<'workspace_user'>[] | undefined>({
    queryKey: ['workspaceUserList', workspaceId],
    queryFn: () => {
      if (!workspaceUserId) return;
      return api.workspaceUserList.getWorkspaceUserList(workspaceId, workspaceUserId);
    },
    enabled: !!workspaceUserId
  });

  return { workspaceUserList, isPending, isError };
};

export default useWorkspaceUserList;
