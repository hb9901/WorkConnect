import api from '@/api';
import useUserStore from '@/store/userStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const useWorkspaceList = (workspaceId: number, userId: string | null) => {
  const setWorkspaceData = useUserStore((state) => state.setWorkspaceData);
  const {
    data: workspaceInfo,
    isPending,
    isError
  } = useQuery({
    queryKey: ['workspaceList'],
    queryFn: () => {
      if (!userId) return;
      return api.workspaceList.getWorkspaceList(workspaceId, userId);
    },
    enabled: !!userId
  });

  useEffect(() => {
    if (workspaceInfo) {
      const workspaceUserId = workspaceInfo.userData[0].id;
      const workspaceList = workspaceInfo.workspaceListData;
      setWorkspaceData(workspaceUserId, workspaceList);
    }
  }, [workspaceInfo]);

  return { workspaceInfo, isPending, isError };
};

export default useWorkspaceList;
