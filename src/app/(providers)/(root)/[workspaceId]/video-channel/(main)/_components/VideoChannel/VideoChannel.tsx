'use client';
import { PersonFilledIcon } from '@/icons';
import { facingModeFromLocalTrack, LocalTrack, LocalVideoTrack, Track } from 'livekit-client';
import { useEffect, useMemo, useRef } from 'react';

type VideoChannelProps = {
  videoEnabled: boolean;
  tracks: LocalTrack<Track.Kind>[] | undefined;
};

const VideoChannel = ({ tracks, videoEnabled }: VideoChannelProps) => {
  const videoEl = useRef<HTMLVideoElement | null>(null);

  const videoTrack = useMemo(
    () => tracks?.filter((track) => track.kind === Track.Kind.Video)[0] as LocalVideoTrack,
    [tracks]
  );

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
    <div className="flex items-center mt-4 mx-4 w-[80vw]">
      {videoTrack && videoEnabled ? (
        <div className="flex items-center justify-center bg-[#121212] rounded-[10px] h-[55vh] overflow-hidden mx-auto aspect-w-16 aspect-h-9">
          <video
            className="transform scale-x-[-1] w-full h-full object-cover"
            ref={videoEl}
            data-lk-facing-mode={facingMode}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-[50vh] bg-[#D9D9D9] min-w-[400px] w-[50rem] max-w-[1000px] rounded-[10px] mx-auto aspect-w-16 aspect-h-9">
          <div className="rounded-full bg-[#BDBDBD] w-[140px] h-[140px] flex items-center justify-center">
            <PersonFilledIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoChannel;
