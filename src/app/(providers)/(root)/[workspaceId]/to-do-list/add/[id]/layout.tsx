'use client';
import { PageLayout } from '@/components/PageLayout';
import SelectHeader from '@/components/SelectHeader';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { StrictPropsWithChildren } from '@/types/common';
import PcHeader from '../../_components/PcHeader';

interface ProfileParallelLayoutProps {
  todolist: React.ReactNode;
  params: {
    workspaceId: string;
  };
}

const ProfileParallelLayout = ({ children, todolist, params }: StrictPropsWithChildren<ProfileParallelLayoutProps>) => {
  const workspaceId = useWorkspaceId();

  return (
    <>
      <div className="lg:hidden">
        <div className="hidden lg:grid lg:w-full">
          <PcHeader />
          {todolist}
        </div>
        <div className="w-full lg:max-w-[calc((100dvw-297px)/3)] lg:absolute lg:top-[84px] lg:right-0 lg:transition-all lg:duration-200">
          {children}
        </div>
      </div>
      <div className="hidden lg:grid">
        <PageLayout title="" showTopBar={false}>
          <SelectHeader workspaceId={workspaceId} isTodoList />
          <div className="hidden lg:grid lg:w-full">
            <PcHeader />
            {todolist}
          </div>
          <div className="w-full lg:max-w-[calc((100dvw-297px)/3)] lg:absolute lg:top-[84px] lg:right-0 lg:transition-all lg:duration-200">
            {children}
          </div>
        </PageLayout>
      </div>
    </>
  );
};

export default ProfileParallelLayout;
