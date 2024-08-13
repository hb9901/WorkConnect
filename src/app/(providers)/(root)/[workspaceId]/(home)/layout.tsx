import { PageLayout } from '@/components/PageLayout';
import SelectHeader from '@/components/SelectHeader';
import { StrictPropsWithChildren } from '@/types/common';

interface HomeParallelLayoutProps {
  params: {
    workspaceId: string;
  };
}

const HomeParallelLayout = ({ children, params }: StrictPropsWithChildren<HomeParallelLayoutProps>) => {
  const workspaceId = Number(params.workspaceId);

  return (
    <>
      <PageLayout title="" showTopBar={false}>
        <SelectHeader workspaceId={workspaceId} isFull />
        <div className="lg:pl-[87px]">{children}</div>
      </PageLayout>
    </>
  );
};

export default HomeParallelLayout;
