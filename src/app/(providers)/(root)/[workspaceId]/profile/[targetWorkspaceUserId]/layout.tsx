'use client';
import { StrictPropsWithChildren } from '@/types/common';

interface ProfileParallelLayoutProps {
  home: React.ReactNode;
  params: {
    workspaceId: string;
  };
}

const ProfileParallelLayout = ({ children, home, params }: StrictPropsWithChildren<ProfileParallelLayoutProps>) => {
  return (
    <>
      <div className="flex lg:flex-row">
        <div className="hidden lg:flex lg:w-full">{home}</div>
        <div className="w-full fixed lg:min-w-[374px] lg:max-w-[374px] lg:w-[374px] lg:top-[84px] lg:right-0">
          {children}
        </div>
      </div>
    </>
  );
};

export default ProfileParallelLayout;
