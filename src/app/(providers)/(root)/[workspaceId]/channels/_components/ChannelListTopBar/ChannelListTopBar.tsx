import Typography from '@/components/Typography';
import { MessageChatButton, VideoChatButton } from '../TopBarButtons';

const ChannelListTopBar = () => {
  return (
    <div className="flex items-center justify-between h-[52px] px-4 sticky top-0 bg-[#F4F4F6] z-10">
      <Typography as="strong" variant="Title16px" color="grey700Black">
        모임 목록
      </Typography>
      <ul className="flex items-center gap-3">
        <li>
          <VideoChatButton />
        </li>
        <li>
          <MessageChatButton />
        </li>
      </ul>
    </div>
  );
};

export default ChannelListTopBar;
