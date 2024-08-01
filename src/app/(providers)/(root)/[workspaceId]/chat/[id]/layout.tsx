'use client';

import { PageLayout } from '@/components/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';

const ChatDetailLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <PageLayout
      title="채팅"
      showBottomBar={false}
      TopBarLeftIcon1={<button>뒤로가기</button>}
      TopBarLeftIcon2={<button>1</button>}
      TopBarRightIcon1={<button>화상채팅</button>}
      TopBarRightIcon2={<button>채팅</button>}
    >
      {children}
    </PageLayout>
  );
};

export default ChatDetailLayout;
