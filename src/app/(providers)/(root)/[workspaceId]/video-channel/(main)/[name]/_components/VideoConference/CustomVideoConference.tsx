'use client';

import { useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import useDeviceType from '../../../../_hooks/useDeviceType';
import useFocosedTrack from '../../_store/useFocusTrack';
import BottomControlBar from '../BottomControlBar';
import MobileLayout from '../MobileLayout';
import WebLayout from '../WebLayout';

const CustomVideoConference = () => {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: false },
      { source: Track.Source.ScreenShare, withPlaceholder: false }
    ],
    { onlySubscribed: true }
  );
  const { isMobile } = useDeviceType();
  const {} = useFocosedTrack();

  return (
    <div className="relative flex flex-col items-center h-[92vh] bg-grey600">
      {isMobile ? <MobileLayout tracks={tracks} /> : <WebLayout tracks={tracks} />}
      <BottomControlBar
        className="absolute bottom-0"
        controls={{ microphone: true, camera: true, screenShare: true }}
        variation="verbose"
      />
    </div>
  );
};

export default CustomVideoConference;
