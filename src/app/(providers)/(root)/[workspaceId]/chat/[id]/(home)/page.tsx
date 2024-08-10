import ChatNotice from '../_components/ChatNotice';
import MessagesContainer from '../_components/MessagesContainer';
import Messages from '../_components/Messages';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ChatDetailLayout from '../_components/ChatDetailLayout';
import { getChannelName } from '../../_utils/getQueryOptions';

const queryClient = new QueryClient();

const ChatDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
  await queryClient.prefetchQuery(getChannelName(Number(id)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatDetailLayout>
        <MessagesContainer>
          <ChatNotice />
          <Messages />
        </MessagesContainer>
      </ChatDetailLayout>
    </HydrationBoundary>
  );
};

export default ChatDetailPage;
