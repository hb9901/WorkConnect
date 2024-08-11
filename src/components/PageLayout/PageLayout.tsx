import { StrictPropsWithChildren } from '@/types/common';
import BottomNavigationBar from '../BottomNavigationBar';
import { TopBar, TopBarProps } from '../TopBar';

type PageLayoutProps = {
  showTopBar?: boolean;
  showBottomBar?: boolean;
  contentClassName?: string;
} & StrictPropsWithChildren &
  TopBarProps;

export const PageLayout = ({
  children,
  showTopBar = true,
  showBottomBar = true,
  title,
  contentClassName,
  ...topBarProps
}: PageLayoutProps) => {
  return (
    <>
      {showTopBar && <TopBar title={title} className="sticky top-0 z-30" {...topBarProps} />}
      <main className={contentClassName}>{children}</main>
      {showBottomBar && (
        <>
          <div className="h-[78px]" />
          <BottomNavigationBar className="fixed bottom-0 left-0 z-30 sm:w-full lg:top-[84px] lg:w-[87px] lg:h-[898px]" />
        </>
      )}
    </>
  );
};
