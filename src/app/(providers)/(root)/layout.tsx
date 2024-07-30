'use client';
import api from '@/api';
import useUserStore from '@/store/userStore';
import { StrictPropsWithChildren } from '@/types/common';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

const RootLayout = ({ children }: StrictPropsWithChildren) => {
  const params = useParams();
  const workspaceId = params.workspaceId;
  const { userId, setWorkspaceData } = useUserStore(
    useShallow((state) => ({
      userId: state.userId,
      setWorkspaceData: state.setWorkspaceData
    }))
  );

  useEffect(() => {
    if (workspaceId && userId) getWorkspacaeList(Number(workspaceId), userId);
  }, [userId, workspaceId]);

  const getWorkspacaeList = async (workspaceId: number, userId: string) => {
    const data = await api.workspaceList.getWorkspaceList(workspaceId, userId);
    const workspaceUserId = data.userData[0].id;
    const workspaceList = data.workspaceListData;
    setWorkspaceData(workspaceUserId, workspaceList);
  };
  return <>{children}</>;
};

export default RootLayout;
