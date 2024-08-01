import { PageLayout } from '@/components/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';

const RootLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <PageLayout showTopBar={false} title="">
      {children}
    </PageLayout>
  );
};

export default RootLayout;
