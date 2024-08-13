import { PageLayout } from '@/components/PageLayout';
import SelectHeader from '@/components/SelectHeader';
import { StrictPropsWithChildren } from '@/types/common';

interface ProfileParallelLayoutProps {
  home: React.ReactNode;
  params: {
    workspaceId: string;
  };
}

const ProfileParallelLayout = ({ children, home, params }: StrictPropsWithChildren<ProfileParallelLayoutProps>) => {
  const workspaceId = Number(params.workspaceId);

  return (
    <>
      {/*모바일 레이아웃*/}
      <div className="lg:hidden">
        <div className="flex lg:flex-row">
          <div className="hidden lg:flex lg:w-full">{home}</div>
          <div className="w-full lg:min-w-[374px] lg:max-w-[374px]"></div>
          <div className="w-full fixed lg:min-w-[374px] lg:max-w-[374px] lg:w-[374px] lg:top-[84px] lg:right-0">
            {children}
          </div>
        </div>
      </div>
      {/*PC 레이아웃*/}
      <div className="hidden lg:flex">
        <PageLayout title="" showTopBar={false}>
          <SelectHeader workspaceId={workspaceId} isFull isHidden />
          <div className="flex lg:flex-row">
            <div className="hidden lg:flex lg:w-full lg:pl-[87px]">{home}</div>
            <div className="w-full lg:min-w-[374px] lg:max-w-[374px]"></div>
            <div className="w-full fixed lg:min-w-[374px] lg:max-w-[374px] lg:w-[374px] lg:top-[84px] lg:right-0">
              {children}
            </div>
          </div>
        </PageLayout>
      </div>
    </>
  );
};

export default ProfileParallelLayout;
