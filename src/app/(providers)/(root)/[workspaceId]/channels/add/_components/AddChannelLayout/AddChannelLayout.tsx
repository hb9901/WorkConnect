'use client';

import { BottomBar, PageLayout, PageMain, PageAside } from '@/components/Layout/PageLayout';
import { TopBar } from '@/components/Layout/TopBar';
import { Check1Icon, XIcon } from '@/icons';
import { StrictPropsWithChildren } from '@/types/common';
import { useRouter } from 'next/navigation';
import ChannelList from '../../../_components/ChannelList';
import ChannelListTopBar from '../../../_components/ChannelListTopBar';

type AddChannelLayoutProps = {
  title: string;
  onSubmit: () => Promise<void>;
};

const AddChannelLayout = ({ title, children, onSubmit }: StrictPropsWithChildren<AddChannelLayoutProps>) => {
  const router = useRouter();

  return (
    <PageLayout>
      <PageAside>
        <div className="mr-[-8px]">
          <ChannelListTopBar />
          <ChannelList />
        </div>
      </PageAside>
      <PageMain className="h-dvh overflow-hidden">
        <TopBar
          title={title}
          Icon1={<XIcon onClick={() => router.back()} />}
          Icon4={
            <button onClick={onSubmit}>
              <Check1Icon />
            </button>
          }
        />
        {children}
      </PageMain>
      <BottomBar className="hidden lg:block" />
    </PageLayout>
  );
};

export default AddChannelLayout;
