import { StrictPropsWithChildren } from '@/types/common';
import BottomNavigationBar from '../BottomNavigationBar';
import { TopBar, TopBarProps } from '../TopBar';

type PageLayoutProps = {
  showTopBar?: boolean;
  showBottomBar?: boolean;
} & StrictPropsWithChildren &
  TopBarProps;

export const PageLayout = ({
  children,
  showTopBar = true,
  showBottomBar = true,
  title,
  ...topBarProps
}: PageLayoutProps) => {
  return (
    <>
      {showTopBar && <TopBar title={title} className="sticky top-0 z-50" {...topBarProps} />}
      <main>{children}</main>
      {showBottomBar && (
        <>
          <div className="h-[78px]" />
          <BottomNavigationBar className="fixed bottom-0 left-0 z-50 w-full" />
        </>
      )}
    </>
  );
};
