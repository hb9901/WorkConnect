'use client';
import api from '@/api';
import useUserStore from '@/store/userStore';
import { StrictPropsWithChildren } from '@/types/common';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

const HomeLayout = ({ children }: StrictPropsWithChildren) => {
  const { userId, workspaceId, setWorkspaceData } = useUserStore(
    useShallow((state) => ({
      userId: state.userId,
      workspaceId: state.workspaceId,
      setWorkspaceData: state.setWorkspaceData
    }))
  );

  useEffect(() => {
    if (workspaceId && userId) getWorkspacaeList(workspaceId, userId);
  }, [userId, workspaceId]);

  const getWorkspacaeList = async (workspaceId: number, userId: string) => {
    const data = await api.workspaceList.getWorkspaceList(workspaceId, userId);
    const workspaceUserId = data.userData[0].id;
    const workspaceList = data.workspaceListData;
    setWorkspaceData(workspaceUserId, workspaceList);
  };
  return <>{children}</>;
};

export default HomeLayout;
