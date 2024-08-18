import { StrictPropsWithChildren } from '@/types/common';
import BottomControlBar from '../BottomControlBar';
import VideoChannelHeader from '../VideoChannelHeader';

const VideoLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0">
        <VideoChannelHeader />
      </div>
      <div className="flex-grow overflow-y-auto bg-grey600">{children}</div>
      <div className="flex-shrink-0">
        <BottomControlBar />
      </div>
    </div>
  );
};

export default VideoLayout;
