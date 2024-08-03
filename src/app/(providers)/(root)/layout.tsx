import { StrictPropsWithChildren } from '@/types/common';
import Splash from './_components/Splash';

const RootLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <>
      {children}
      <Splash />
    </>
  );
};

export default RootLayout;
