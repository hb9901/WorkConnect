import Typography from '@/components/Typography';
import { useContextMenu } from '../../_provider/ContextMenuProvider';
import CopyIcon from '@/icons/Copy.svg';
import HashIcon from '@/icons/Hash.svg';
import TrashIcon from '@/icons/Trash.svg';
import { supabase } from '@/utils/supabase/supabaseClient';
import { CHAT_TYPE } from '@/constants/chat';
import clsx from 'clsx';
import { useSnackBar } from '@/providers/SnackBarContext';
import { useMutationChatMessage } from '../../../_hooks/useChatMutation';
import { useParams } from 'next/navigation';

const ContextMenu = () => {
  const { id } = useParams();

  const { contextMenuState, closeContextMenu } = useContextMenu();
  const { openSnackBar } = useSnackBar();

  const { mutate: mutateChatMessage } = useMutationChatMessage({
    channel_id: Number(id)
  });

  const deleteChat = async () => {
    if (!contextMenuState.id) return;

    await supabase.from('chat').delete().eq('id', contextMenuState.id);

    openSnackBar({ message: '삭제가 완료되었어요' });

    closeContextMenu();
  };

  const copyText = () => {
    window.navigator.clipboard.writeText(contextMenuState.text || '').then(() => {
      openSnackBar({ message: '복사가 완료되었어요' });
    });

    closeContextMenu();
  };

  const handleNotice = () => {
    mutateChatMessage({ content: contextMenuState.text || '', type: CHAT_TYPE.notice });
    closeContextMenu();
  };

  if (!contextMenuState.isOpen) return null;

  const position = contextMenuState.isMe ? contextMenuState.position : contextMenuState.position + 40;

  return (
    <>
      <ul
        style={{ bottom: position }}
        className={clsx(
          'fixed rounded-[6px] bg-bgBackground1 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.15)] z-50 w-[154px] flex p-4 gap-[20px] flex-col',
          contextMenuState.position >= 150 ? '' : 'translate-y-[-100%]',
          contextMenuState.isMe ? 'right-[16px]' : 'left-[56px]'
        )}
      >
        {contextMenuState.type === CHAT_TYPE.text && (
          <li className="flex items-center justify-between" onClick={copyText}>
            <Typography variant="Subtitle16px" color="grey900">
              복사
            </Typography>
            <CopyIcon />
          </li>
        )}
        <li className="flex items-center justify-between" onClick={handleNotice}>
          <Typography variant="Subtitle16px" color="grey900">
            공지
          </Typography>
          <HashIcon />
        </li>
        {contextMenuState.isMe && (
          <li className="flex items-center justify-between" onClick={deleteChat}>
            <Typography variant="Subtitle16px" color="grey900">
              삭제
            </Typography>
            <TrashIcon />
          </li>
        )}
      </ul>
      <div className="fixed top-0 left-0 w-full h-full z-40" onClick={closeContextMenu} />
    </>
  );
};

export default ContextMenu;
