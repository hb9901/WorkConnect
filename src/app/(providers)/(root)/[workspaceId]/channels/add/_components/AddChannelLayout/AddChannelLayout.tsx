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
};

const AddChannelLayout = ({ title, children }: StrictPropsWithChildren<AddChannelLayoutProps>) => {
  const router = useRouter();

  return (
    <PageLayout>
      <PageAside>
        <div className="mr-[-8px]">
          <ChannelListTopBar />
          <ChannelList />
        </div>
      </PageAside>
      <PageMain className="flex flex-col">
        <TopBar
          title={title}
          Icon1={<XIcon onClick={() => router.back()} className="lg:hidden" />}
          Icon4={
            <button>
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
