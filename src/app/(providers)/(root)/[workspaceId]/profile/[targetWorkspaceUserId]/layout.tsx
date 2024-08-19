import { BottomBar, PageMain, PCHeader, PCWrapper } from '@/components/Layout/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';

interface ProfileParallelLayoutProps {
  home: React.ReactNode;
}

const ProfileParallelLayout = ({ children, home }: StrictPropsWithChildren<ProfileParallelLayoutProps>) => {
  return (
    <>
      <PCWrapper isHome>
        <PCHeader isFull />
        <PageMain className="lg:pl-[87px] lg:!w-full">
          <div className="flex lg:flex-row ">
            <div className="hidden lg:grid lg:w-full lg:max-h-[calc(100dvh-84px)] lg:overflow-y-scroll lg:sticky lg:mt-[84px] lg:scroll-container">
              {home}
            </div>
            <div className="w-full lg:min-w-[375px] lg:max-w-[375px]" />
            <div
              className="w-full h-full fixed lg:h-auto lg:min-w-[375px] lg:max-w-[375px] lg:w-[375px] lg:top-[84px] lg:bottom-0 lg:right-0 
            lg:border-[#E5E7EB] lg:border-l-[1px] overflow-y-scroll scroll-container z-50"
            >
              {children}
            </div>
          </div>
        </PageMain>
        <BottomBar className="hidden lg:flex" />
      </PCWrapper>
    </>
  );
};

export default ProfileParallelLayout;
