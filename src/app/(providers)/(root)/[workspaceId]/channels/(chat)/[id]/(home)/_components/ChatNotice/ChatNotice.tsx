'use client';

import { BellIcon, ChevronDownIcon } from '@/icons';
import Typography from '@/components/Typography';
import Link from 'next/link';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useChatHandlers } from '../../_hooks/useChatHandlers';
import { isEmpty } from '@/utils/isEmpty';
import { useEffect } from 'react';
import { useGetLatestNotice } from '../../../../_hook/useChatQuery';
import { handleSubscribeToNotice } from '../../_utils/subscribe';
import useGetParamsChannelId from '../../../../_hook/useGetParamsChannelId';

const ChatNotice = () => {
  const channelId = useGetParamsChannelId();
  const workspaceId = useWorkspaceId();

  const { data: latestNotice } = useGetLatestNotice({ id: channelId });
  const { handleNoticeUpdates: handleUpdates } = useChatHandlers();

  useEffect(() => {
    if (!channelId) return;

    const channel = handleSubscribeToNotice({
      handler: handleUpdates({ latestNoticeId: latestNotice?.id, channelId }),
      id: channelId
    }).subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [channelId, latestNotice?.id]);

  const isEmptyLatestNotice = isEmpty(latestNotice);
  if (isEmptyLatestNotice) return null;

  return (
    <>
      <Link
        href={`/${workspaceId}/channels/${channelId}/notice`}
        className="fixed top-0 left-0 right-0 mx-4 h-[34px] shadow-2xl rounded-[4px] flex items-center gap-1 bg-[#F7F7F7] py-2 px-3 z-30"
      >
        <BellIcon className="shrink-0" />
        <Typography
          variant="Body12px"
          color="grey500"
          className="flex-grow text-ellipsis whitespace-nowrap overflow-hidden"
        >
          {latestNotice.content}
        </Typography>
        <ChevronDownIcon className="w-4 h-4 stroke-grey500" />
      </Link>
      <div className="h-[34px] flex-shrink-0" />
    </>
  );
};

export default ChatNotice;
