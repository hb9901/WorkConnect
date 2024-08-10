import { useRef } from 'react';
import { useMutationChatMessage } from '../../../_hooks/useChatMutation';
import MessageTextarea from '../MessageTextarea';
import UtilsMenu from '../UtilsMenu';
import ContextMenu from '../ContextMenu';
import { useParams } from 'next/navigation';

type MessageSenderProps = {
  handleOpenUtil: () => void;
};

const MessageSender = ({ handleOpenUtil }: MessageSenderProps) => {
  const { id: channelId } = useParams();
  const stringId = Array.isArray(channelId) ? channelId[0] : channelId;
  const ref = useRef<HTMLTextAreaElement>(null);

  const { mutate: mutateChatMessage } = useMutationChatMessage({
    channel_id: Number(stringId)
  });

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ref.current?.value || ref.current?.value.trim() === '') return;

    mutateChatMessage({ content: ref.current.value, type: 'text' });
    ref.current.value = '';
  };

  return (
    <div className="relative z-50">
      <form onSubmit={handleSendMessage}>
        <MessageTextarea handleOpenUtil={handleOpenUtil} ref={ref} />
      </form>
      <UtilsMenu handleOpenUtil={handleOpenUtil} />
      <ContextMenu />
    </div>
  );
};

export default MessageSender;
