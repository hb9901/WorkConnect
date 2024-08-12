'use client';
import { StrictPropsWithChildren } from '@/types/common';
import PcHeader from '../../_components/PcHeader';

interface ProfileParallelLayoutProps {
  todolist: React.ReactNode;
  params: {
    workspaceId: string;
  };
}

const ProfileParallelLayout = ({ children, todolist }: StrictPropsWithChildren<ProfileParallelLayoutProps>) => {
  return (
    <>
      <div className="hidden lg:grid lg:w-full">
        <PcHeader />
        {todolist}
      </div>
      <div className="w-full lg:max-w-[calc((100dvw-297px)/3)] lg:absolute lg:top-[84px] lg:right-0 lg:transition-all lg:duration-200">
        {children}
      </div>
    </>
  );
};

export default ProfileParallelLayout;
