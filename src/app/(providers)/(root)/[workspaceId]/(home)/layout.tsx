'use client';

import { PageLayout } from '@/components/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';

const HomeLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <PageLayout title="" showTopBar={false}>
      {children}{' '}
    </PageLayout>
  );
};

export default HomeLayout;
