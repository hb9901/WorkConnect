'use client';

import { useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import useDeviceType from '../../../../_hooks/useDeviceType';
import MobileLayout from '../MobileLayout';
import VideoLayout from '../VideoLayout';
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
  // const { hasFocusedTrack } = useFocosedTrack();

  return <VideoLayout>{isMobile ? <MobileLayout tracks={tracks} /> : <WebLayout tracks={tracks} />}</VideoLayout>;
};

export default CustomVideoConference;
