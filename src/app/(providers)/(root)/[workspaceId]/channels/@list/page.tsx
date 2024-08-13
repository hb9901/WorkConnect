import { ResponseList } from '../_components/ResponseLayout';
import ChatLayout from './_components/ChatLayout';
import ChatList from './_components/ChatList';

const ChannelSlot = () => {
  return (
    <ResponseList>
      <ChatLayout>
        <ChatList />
      </ChatLayout>
    </ResponseList>
  );
};

export default ChannelSlot;
