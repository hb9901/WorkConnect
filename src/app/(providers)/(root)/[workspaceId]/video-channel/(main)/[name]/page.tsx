import Typography from '@/components/Typography';
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
    return (
      <div className="h-screen justify-center items-center">
        <Typography variant="Title16px">404 잘못된 접근입니다.</Typography>
      </div>
    );
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoRoom name={params.name} />
    </Suspense>
  );
};
export default VideoCallRoom;
