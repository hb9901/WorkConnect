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
    <Suspense>
      <VideoRoom name={params.name} />
    </Suspense>
  );
};
export default VideoCallRoom;
