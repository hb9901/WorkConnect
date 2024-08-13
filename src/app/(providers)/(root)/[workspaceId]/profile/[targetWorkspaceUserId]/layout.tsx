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
        <div className="hidden lg:grid">
          <SelectHeader workspaceId={workspaceId} isFull isHidden />
        </div>
        <div className="flex lg:flex-row lg:pl-[87px]">
          <div className="hidden lg:grid lg:w-full ">{home}</div>
          <div className="w-full lg:min-w-[374px] lg:max-w-[374px]"></div>
          <div
            className="w-full fixed lg:min-w-[374px] lg:max-w-[374px] lg:w-[374px] lg:top-[84px] lg:right-0 
            lg:border-[#E5E7EB] lg:border-l-[1px]"
          >
            {children}
          </div>
        </div>
      </main>
      <>
        <div className="h-[87px]" />
        <BottomNavigationBar className="hidden fixed bottom-0 left-0 z-30 xs:w-full lg:top-[84px] lg:flex lg:items-start lg:w-[87px] lg:h-[vh100%] lg:bg-[#F4F4F6] lg:border-r-[1px] lg:border-grey50" />
      </>
    </>
  );
};

export default ProfileParallelLayout;
