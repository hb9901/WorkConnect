import { useRef } from 'react';
import { useMutationChatMessage } from '../../../_hooks/useMutationChat';
import TestButton from '../../../_components/TestButton';

// TODO: 데이터 추가 시 수정 필요
const WORKSPACE_USER_ID = '2b5cc93d-1353-4adb-a8c5-60855dc4e5a2';

const ChatFooter = ({ id }: { id: string }) => {
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
    <form onSubmit={handleSendMessage}>
      <div className="flex flex-col gap-2 py-4 w-full bg-white border-t-2 h-[132px]">
        <input type="text" ref={ref} placeholder="메시지를 입력하세요" className="border p-2 rounded w-full" />
        <TestButton className="p-2 text-white mt-2">전송</TestButton>
      </div>
    </form>
  );
};

export default ChatFooter;
