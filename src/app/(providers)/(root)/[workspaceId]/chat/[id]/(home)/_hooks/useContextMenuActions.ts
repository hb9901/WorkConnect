import { useSnackBar } from '@/providers/SnackBarContext';
import { useParams } from 'next/navigation';
import { CHAT_TYPE } from '@/constants/chat';
import { useContextMenu } from '../_provider/ContextMenuProvider';
import { useMutationChatMessage, useMutationDeleteChatMessage } from '../../../_hook/useChatMutation';
import { useCallback } from 'react';

export const useContextMenuActions = () => {
  const { id } = useParams();
  const { contextMenuState, closeContextMenu } = useContextMenu();
  const { openSnackBar } = useSnackBar();

  const { mutate: mutateChatMessage } = useMutationChatMessage({
    channel_id: Number(id)
  });

  const { mutateAsync: mutateDeleteChatMessage } = useMutationDeleteChatMessage({
    channel_id: Number(id)
  });

  const deleteChat = useCallback(async () => {
    if (!contextMenuState.id) return;

    await mutateDeleteChatMessage(contextMenuState.id);

    openSnackBar({ message: '삭제가 완료되었어요' });
    closeContextMenu();
  }, [contextMenuState.id]);

  const copyText = useCallback(() => {
    window.navigator.clipboard.writeText(contextMenuState.text || '').then(() => {
      openSnackBar({ message: '복사가 완료되었어요' });
    });

    closeContextMenu();
  }, [contextMenuState.text]);

  const handleNotice = useCallback(() => {
    mutateChatMessage({ content: contextMenuState.text || '', type: CHAT_TYPE.notice });
    closeContextMenu();
  }, [contextMenuState.text]);

  return { contextMenuState, closeContextMenu, copyText, deleteChat, handleNotice };
};
