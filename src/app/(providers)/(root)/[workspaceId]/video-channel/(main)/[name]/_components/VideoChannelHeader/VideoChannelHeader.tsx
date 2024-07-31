import Typography from '@/components/Typography';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import ArrowLeftIcon from '@/icons/ArrowLeft.svg';
import LeaveIcon from '@/icons/LogOut.svg';
import { useParams, useRouter } from 'next/navigation';
import DisconnectButton from '../../../_components/DisconnectButton';
const VideoChannelHeader = () => {
  const params = useParams();
  const router = useRouter();
  const name = decodeURIComponent(params.name as string);
  const workspaceId = useWorkspaceId();
  return (
    <div className="flex items-center justify-between px-4 py-3 mt-[2px]">
      <ArrowLeftIcon className="size-7" onClick={() => router.back()} />
      <Typography color="grey700Black" variant="Title20px" as="h2">
        {name}
      </Typography>
      <DisconnectButton onClick={() => router.push(`/${workspaceId}/chat`)}>
        <LeaveIcon />
      </DisconnectButton>
    </div>
  );
};

export default VideoChannelHeader;
