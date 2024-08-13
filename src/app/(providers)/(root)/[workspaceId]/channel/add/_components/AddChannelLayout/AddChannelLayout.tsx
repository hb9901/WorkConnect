'use client';

import { PageLayout } from '@/components/PageLayout';
import { Check1Icon, XIcon } from '@/icons';
import { StrictPropsWithChildren } from '@/types/common';
import { useRouter } from 'next/navigation';

type AddChannelLayoutProps = {
  title: string;
  onSubmit: () => Promise<void>;
};

const AddChannelLayout = ({ title, children, onSubmit }: StrictPropsWithChildren<AddChannelLayoutProps>) => {
  const router = useRouter();

  return (
    <PageLayout
      title={title}
      showBottomBar={false}
      TopBarLeftIcon1={<XIcon onClick={() => router.back()} />}
      TopBarRightIcon1={
        <button onClick={onSubmit}>
          <Check1Icon />
        </button>
      }
    >
      {children}
    </PageLayout>
  );
};

export default AddChannelLayout;
