'use client';
import { PageLayout } from '@/components/PageLayout';
import SelectHeader from '@/components/SelectHeader';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { StrictPropsWithChildren } from '@/types/common';

interface HomeParallelLayoutProps {
  profile: React.ReactNode;
}

const HomeParallelLayout = ({ children }: StrictPropsWithChildren<HomeParallelLayoutProps>) => {
  const workspaceId = useWorkspaceId();

  return (
    <>
      <PageLayout title="" showTopBar={false}>
        <SelectHeader workspaceId={workspaceId} isFull />
        <div className="">{children}</div>
      </PageLayout>
    </>
  );
};

export default HomeParallelLayout;
