import Typography from '@/components/Typography';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useStreamSetStore from '@/store/streamSetStore';
import { useParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import DeviceMenuButton from '../../../_components/DeviceMenuButton';
import DisconnectButton from '../../../_components/DisconnectButton';
const VideoChannelHeader = () => {
  const params = useParams();
  const router = useRouter();
  const name = decodeURIComponent(params.name as string);
  const workspaceId = useWorkspaceId();
  const { setIsSettingOk } = useStreamSetStore();

  const handleDisconnect = useCallback(() => {
    setIsSettingOk(false);
    router.push(`/${workspaceId}/chat`);
  }, [workspaceId]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-10 shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        <DeviceMenuButton />
        <Typography color="grey700Black" variant="Title20px" as="h2">
          {name}
        </Typography>
        <DisconnectButton onClick={handleDisconnect}>{'종료'}</DisconnectButton>
      </div>
    </header>
  );
};

export default VideoChannelHeader;
