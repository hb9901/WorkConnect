import { useParams } from 'next/navigation';
import { BellIcon, ChevronDownIcon } from '@/icons';
import Typography from '@/components/Typography';
import Link from 'next/link';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { isEmpty } from '@/utils/isEmpty';
import { GetChatMessageType } from '@/types/chat';

const ChatNotice = ({ latestNotice }: { latestNotice: GetChatMessageType }) => {
  const { id } = useParams();
  const workspaceId = useWorkspaceId();
  const stringId = Array.isArray(id) ? id[0] : id;

  if (isEmpty(latestNotice)) return null;

  return (
    <>
      <Link
        href={`/${workspaceId}/chat/${stringId}/notice`}
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
