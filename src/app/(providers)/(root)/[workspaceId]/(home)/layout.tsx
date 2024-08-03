'use client';

import { PageLayout } from '@/components/PageLayout';
import SelectHeader from '@/components/SelectHeader';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useWorkspaceList from '@/hooks/useWorkspaceList';
import useUserStore from '@/store/userStore';
import { StrictPropsWithChildren } from '@/types/common';

const HomeLayout = ({ children }: StrictPropsWithChildren) => {
  const workspaceId = useWorkspaceId();
  const userId = useUserStore((state) => state.userId);
  const { workspaceInfo, isPending, isError } = useWorkspaceList(workspaceId, userId);

  if (isPending || isError || !workspaceInfo) {
    return (
      <PageLayout title="" showTopBar={false}>
        <></>
      </PageLayout>
    );
  }
  return (
    <PageLayout title="" showTopBar={false}>
      <SelectHeader workspaceList={workspaceInfo.workspaceListData} workspaceId={workspaceId} />
      {children}
    </PageLayout>
  );
};

export default HomeLayout;
