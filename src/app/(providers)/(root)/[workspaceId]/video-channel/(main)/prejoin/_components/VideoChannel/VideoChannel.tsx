'use client';
import { PersonFilledIcon } from '@/icons';
import { facingModeFromLocalTrack, LocalTrack, LocalVideoTrack, Track } from 'livekit-client';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type VideoChannelProps = {
  tracks: LocalTrack<Track.Kind>[] | undefined;
  videoEnable: boolean;
};

const VideoChannel = ({ tracks, videoEnable }: VideoChannelProps) => {
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const [isvideoEnable, setIsVideoEnable] = useState<boolean>();
  const videoTrack = useMemo(
    () => tracks?.filter((track) => track.kind === Track.Kind.Video)[0] as LocalVideoTrack,
    [tracks]
  );
  useEffect(() => {
    setIsVideoEnable(videoEnable);
  }, [videoEnable]);

  useEffect(() => {
    if (videoEl.current && videoTrack) {
      videoTrack.unmute();
      videoTrack.attach(videoEl.current);
    }

    return () => {
      videoTrack?.detach();
    };
  }, [videoTrack]);

  const facingMode = useMemo(() => {
    if (videoTrack) {
      const { facingMode } = facingModeFromLocalTrack(videoTrack);
      return facingMode;
    } else {
      return 'undefined';
    }
  }, [videoTrack]);

  return (
    <div className="w-full h-full relative">
      {videoTrack && isvideoEnable ? (
        <div className="flex items-center justify-center bg-[#121212] w-full h-[55vh] overflow-hidden mx-auto aspect-w-16 aspect-h-9">
          <video
            autoFocus
            className="transform scale-x-[-1] w-full h-full object-cover"
            ref={videoEl}
            data-lk-facing-mode={facingMode}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-[50vh] bg-[#D9D9D9] min-w-[363px] md:w-[43vw] max-w-[1000px] rounded-[10px] mx-auto aspect-w-16 aspect-h-9">
          <div className="rounded-full bg-[#BDBDBD] w-[140px] h-[140px] flex items-center justify-center">
            <PersonFilledIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(VideoChannel);
