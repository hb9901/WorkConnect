import BottomNavigationBar from '@/components/BottomNavigationBar';
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
      <main>
        <SelectHeader workspaceId={workspaceId} isFull isHidden />

        <div className="flex lg:flex-row lg:pl-[87px] ">
          <div className="hidden lg:grid lg:w-full lg:max-h-[calc(100dvh-84px)] lg:overflow-y-scroll lg:sticky lg:top-0 lg:scroll-container">
            {home}
          </div>
          <div className="w-full lg:min-w-[375px] lg:max-w-[375px]" />
          <div
            className="w-full fixed lg:min-w-[375px] lg:max-w-[375px] lg:w-[375px] lg:top-[84px] lg:bottom-0 lg:right-0 
            lg:border-[#E5E7EB] lg:border-l-[1px] lg:overflow-y-scroll lg:scroll-container z-50"
          >
            {children}
          </div>
        </div>
      </main>
      <>
        <div className="h-[87px] lg:hidden" />
        <BottomNavigationBar className="hidden fixed bottom-0 left-0 z-30 xs:w-full lg:top-[84px] lg:flex lg:items-start lg:w-[87px] lg:h-[vh100%] lg:bg-[#F4F4F6] lg:border-r-[1px] lg:border-grey50" />
      </>
    </>
  );
};

export default ProfileParallelLayout;
