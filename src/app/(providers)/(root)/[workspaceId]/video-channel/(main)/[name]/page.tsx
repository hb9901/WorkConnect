import NotFound from '@/components/NotFound';
import '@livekit/components-styles';
import { Suspense } from 'react';
import Loading from '../_components/Loading';
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
    <Suspense fallback={<Loading />}>
      <VideoRoom name={params.name} />
    </Suspense>
  );
};
export default VideoCallRoom;
