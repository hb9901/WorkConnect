import api from '@/api';
import { useQuery } from '@tanstack/react-query';

const useWorkspaceList = (workspaceId: number, userId: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['workspaceList'],
    queryFn: () => api.workspaceList.getWorkspaceList(workspaceId, userId)
  });

  return { data, isPending, isError };
};

export default useWorkspaceList;
