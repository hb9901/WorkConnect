import LoadingSpinner from '@/components/LoadingSpinner';
import NotFound from '@/components/NotFound';
import '@livekit/components-styles';
import { Suspense } from 'react';
import VideoRoom from './_components/VideoRoom';
type Params = {
  params: {
    name: string;
    host_id: string;
    channel_id: number;
  };
};
const VideoCallRoom = ({ params }: Params) => {
  if (!params.name) {
    return <NotFound />;
  }
  return (
    <Suspense fallback={<LoadingSpinner className="h-full w-full items-center justify-center" />}>
      <VideoRoom name={params.name} />
    </Suspense>
  );
};
export default VideoCallRoom;
