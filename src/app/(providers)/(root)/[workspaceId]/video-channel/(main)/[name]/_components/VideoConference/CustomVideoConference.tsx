'use client';

import { useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import useDeviceType from '../../../../_hooks/useDeviceType';
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

  return (
    <div className="flex flex-col items-center md:h-[85vh] xl:h-[88vh] bg-[#D9D9D9]">
      {isMobile ? <MobileLayout tracks={tracks} /> : <WebLayout tracks={tracks} />}

      <BottomControlBar controls={{ microphone: true, camera: true, screenShare: true }} variation="verbose" />
    </div>
  );
};

export default CustomVideoConference;
