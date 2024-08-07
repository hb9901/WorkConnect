import { PageLayout } from '@/components/PageLayout';
import SelectHeader from '@/components/SelectHeader';
import { StrictPropsWithChildren } from '@/types/common';

interface HomeLayoutProps {
  params: {
    workspaceId: string;
  };
}

const HomeLayout = ({ children, params }: StrictPropsWithChildren<HomeLayoutProps>) => {
  const workspaceId = Number(params.workspaceId);

  return (
    <PageLayout title="" showTopBar={false}>
      <SelectHeader workspaceId={workspaceId} />
      {children}
    </PageLayout>
  );
};

export default HomeLayout;
