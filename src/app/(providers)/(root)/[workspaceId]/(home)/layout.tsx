'use client';

import api from '@/api';
import { PageLayout } from '@/components/PageLayout';
import SelectHeader from '@/components/SelectHeader';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useUserStore from '@/store/userStore';
import { StrictPropsWithChildren } from '@/types/common';
import { TWorkspaceInfo } from '@/types/workspace';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

const HomeLayout = ({ children }: StrictPropsWithChildren) => {
  const workspaceId = useWorkspaceId();
  const [workspaceList, setWorkspaceList] = useState<TWorkspaceInfo[] | undefined>();
  const { userId, setWorkspaceData } = useUserStore(
    useShallow((state) => ({
      userId: state.userId,
      setWorkspaceData: state.setWorkspaceData
    }))
  );
  const getWorkspacaeList = async (workspaceId: number, userId: string) => {
    const data = await api.workspaceList.getWorkspaceList(workspaceId, userId);
    const workspaceUserId = data.userData[0].id;
    const workspaceList = data.workspaceListData;
    setWorkspaceData(workspaceUserId, workspaceList);
    setWorkspaceList(workspaceList);
  };
  useEffect(() => {
    if (workspaceId && userId) getWorkspacaeList(workspaceId, userId);
  }, [userId, workspaceId]);

  if (!(workspaceId && workspaceList)) return;

  return (
    <PageLayout title="" showTopBar={false}>
      <SelectHeader workspaceList={workspaceList} workspaceId={workspaceId} />
      {children}
    </PageLayout>
  );
};

export default HomeLayout;
