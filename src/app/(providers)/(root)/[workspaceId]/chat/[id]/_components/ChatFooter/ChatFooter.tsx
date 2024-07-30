import { useRef } from 'react';
import { useMutationChatMessage } from '../../../_hooks/useMutationChat';
import MessageTextarea from '../MessageTextarea';
import UtilsMenus from '../UtilsMenus';

// TODO: 데이터 추가 시 수정 필요
const WORKSPACE_USER_ID = '2b5cc93d-1353-4adb-a8c5-60855dc4e5a2';

const ChatFooter = ({ id, handleOpenUtil }: { id: string; handleOpenUtil: () => void }) => {
  const ref = useRef<HTMLInputElement>(null);
  const { mutate: mutateChatMessage } = useMutationChatMessage({
    channel_id: Number(id),
    workspace_user_id: WORKSPACE_USER_ID
  });

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ref.current?.value) return;

    mutateChatMessage({ content: ref.current.value, type: 'text', is_notice: false });
    ref.current.value = '';
  };

  return (
    <>
      <form onSubmit={handleSendMessage}>
        <MessageTextarea handleOpenUtil={handleOpenUtil} ref={ref} />
      </form>
      <UtilsMenus />
    </>
  );
};

export default ChatFooter;
