import { PageLayout } from '@/components/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';

const ChatDetailLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <PageLayout title="채팅" showTopBar={false}>
      {children}
    </PageLayout>
  );
};

export default ChatDetailLayout;
