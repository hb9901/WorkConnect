import CameraPlaceholderIcon from '@/icons/CameraPlaceholder.svg';
import { isTrackReference } from '@livekit/components-core';
import { VideoTrack } from '@livekit/components-react';
import { Track } from 'livekit-client';
import React from 'react';
import useFocosedTrack from '../../_store/useFocusTrack';
const FocusedVideoTrack = () => {
  const { focusedTrack: focusedTrackRef } = useFocosedTrack();
  return (
    <>
      {isTrackReference(focusedTrackRef) &&
      (Track.Source.Camera === focusedTrackRef.source || Track.Source.ScreenShare === focusedTrackRef.source) ? (
        <div className={`relative bg-grey700Black rounded-[5px] 'h-[88%]' `}>
          <div>
            <VideoTrack trackRef={focusedTrackRef} />
          </div>
        </div>
      ) : (
        <div className="bg-grey700Black rounded-lg w-[88%] h-[88%] flex justify-center items-center">
          <CameraPlaceholderIcon />
        </div>
      )}
    </>
  );
};

export default React.memo(FocusedVideoTrack);
