import Typography from '@/components/Typography';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useStreamSetStore from '@/store/streamSetStore';
import { useParams, useRouter } from 'next/navigation';
import DeviceMenuButton from '../../../_components/DeviceMenuButton';
import DisconnectButton from '../../../_components/DisconnectButton';
const VideoChannelHeader = () => {
  const params = useParams();
  const router = useRouter();
  const name = decodeURIComponent(params.name as string);
  const workspaceId = useWorkspaceId();
  const { setIsSettingOk } = useStreamSetStore();
  const handleDisconnect = () => {
    setIsSettingOk(false);
    router.push(`/${workspaceId}/channel`);
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 mt-[2px]">
      <DeviceMenuButton />
      <Typography color="grey700Black" variant="Title20px" as="h2">
        {name}
      </Typography>
      <DisconnectButton onClick={handleDisconnect}>{'종료'}</DisconnectButton>
    </div>
  );
};

export default VideoChannelHeader;
