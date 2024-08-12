import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getChannelNameOptions } from '../../_utils/getQueryOptions';
import ChatDetailLayout from './_components/ChatDetailLayout';
import MessagesContainer from './_components/MessagesContainer';
import ChatNotice from './_components/ChatNotice';
import Messages from './_components/Messages';
import UpdateChannelReadAt from './_components/UpdateChannelReadAt';

const queryClient = new QueryClient();

const ChatDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
  await queryClient.prefetchQuery(getChannelNameOptions(Number(id)));

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ChatDetailLayout>
          <MessagesContainer>
            <ChatNotice />
            <Messages />
          </MessagesContainer>
        </ChatDetailLayout>
      </HydrationBoundary>
      <UpdateChannelReadAt />
    </>
  );
};

export default ChatDetailPage;
