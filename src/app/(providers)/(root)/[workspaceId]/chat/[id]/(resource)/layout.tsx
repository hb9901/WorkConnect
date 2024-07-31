import { Tabs, Tab } from '@/components/Tabs';
import type { StrictPropsWithChildren } from '@/types/common';
import TestHeader from '../../_components/TestHeader';

const ResourceLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <>
      <TestHeader title="채팅 상대" rightButton={<button>확인</button>} />
      <Tabs>
        <Tab active>사진&amp;동영상</Tab>
        <Tab>파일</Tab>
        <Tab>공지</Tab>
      </Tabs>
      {children}
    </>
  );
};

export default ResourceLayout;
