import { PageMain, PCHeader, PCWrapper } from '@/components/Layout/PageLayout';
import { TopBar } from '@/components/Layout/TopBar';
import Loading from '@/components/Loading';
import { BottomBar } from '@/components/PageLayout';
import { MessageChatButton, VideoChatButton } from '../_components/TopBarButtons';

const HomeLoading = () => {
  return (
    <PCWrapper>
      <PCHeader className="!flex !w-full !relative lg:!fixed" isChannels isFull />
      <PageMain className="!w-full">
        <TopBar title="대화" Icon3={<VideoChatButton />} Icon4={<MessageChatButton />} className="!hidden lg:!flex" />
        <Loading />
      </PageMain>
      <BottomBar />
    </PCWrapper>
  );
};

export default HomeLoading;
