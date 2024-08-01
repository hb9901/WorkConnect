'use client';
import api from '@/api';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useUserStore from '@/store/userStore';
import { StrictPropsWithChildren } from '@/types/common';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import SplashPage from './_components/splash/SplashPage';

const RootLayout = ({ children }: StrictPropsWithChildren) => {
  const workspaceId = useWorkspaceId();
  const { userId, setWorkspaceData } = useUserStore(
    useShallow((state) => ({
      userId: state.userId,
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
  return (
    <>
      <SplashPage />
      {children}
    </>
  );
};

export default RootLayout;
