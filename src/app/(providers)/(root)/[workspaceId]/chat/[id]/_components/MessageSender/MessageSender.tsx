import MessageTextarea from '../MessageTextarea';
import UtilsMenu from '../UtilsMenu';
import ContextMenu from '../ContextMenu';

type MessageSenderProps = {
  handleOpenUtil: () => void;
};

const MessageSender = ({ handleOpenUtil }: MessageSenderProps) => {
  return (
    <div className="relative z-50">
      <MessageTextarea handleOpenUtil={handleOpenUtil} />
      <UtilsMenu handleOpenUtil={handleOpenUtil} />
      <ContextMenu />
    </div>
  );
};

export default MessageSender;
