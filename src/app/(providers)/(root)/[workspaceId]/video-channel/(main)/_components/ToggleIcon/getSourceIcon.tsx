'use client';
import MicIcon from '@/icons/Mic.svg';
import MicOffIcon from '@/icons/MicOff.svg';
import ShareIcon from '@/icons/Share.svg';
import VideoIcon from '@/icons/Video48.svg';
import VideoOffIcon from '@/icons/VideoOff.svg';
import VolumeIcon from '@/icons/Volume2.svg';
import VolumeXIcon from '@/icons/VolumeX.svg';
import XCircleIcon from '@/icons/XCircle.svg';
import { Track } from 'livekit-client';
import { useEffect, useState } from 'react';
type ToggleIconProps = {
  source: Track.Source;
  enabled: boolean;
};

const ToggleIcon = ({ source, enabled }: ToggleIconProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  switch (source) {
    case Track.Source.Microphone:
      return enabled ? <MicIcon className="h-[24px]" /> : <MicOffIcon className="h-[24px]" />;
    case Track.Source.Camera:
      return enabled ? <VideoIcon className="h-[24px]" /> : <VideoOffIcon className="h-[24px]" />;
    case Track.Source.ScreenShare:
      return enabled ? <XCircleIcon className="h-[24px]" /> : <ShareIcon className="h-[24px]" />;
    default:
      return enabled ? <VolumeXIcon className="h-[24px]" /> : <VolumeIcon className="h-[24px]" />;
  }
};
export default ToggleIcon;
