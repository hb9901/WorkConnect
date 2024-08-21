import { isTrackReference } from '@livekit/components-core';
import { TrackReferenceOrPlaceholder, VideoTrack } from '@livekit/components-react';
import { Track } from 'livekit-client';
import React from 'react';
type FocusedVideoTrackProps = {
  focusedTrackRef: TrackReferenceOrPlaceholder;
};

const FocusedVideoTrack = ({ focusedTrackRef }: FocusedVideoTrackProps) => {
  // const autoManageSubscription = useFeatureContext()?.autoSubscription;

  return (
    <div className={`relative bg-grey700Black/[0.3] rounded-[5px] 'h-[88%]' `}>
      {isTrackReference(focusedTrackRef) &&
        (Track.Source.Camera === focusedTrackRef.source || Track.Source.ScreenShare === focusedTrackRef.source) && (
          <div>
            <VideoTrack trackRef={focusedTrackRef} />
          </div>
        )}
      {/* <div className="absolute bottom-0 left-0 bg-slate-300/[0.5] gap-1 flex justify-center items-center px-1">
        {focusedTrackRef.source !== Track.Source.ScreenShare && (
          <>
            <TrackMutedIndicator
              trackRef={{
                participant: focusedTrackRef.participant,
                source: Track.Source.Microphone
              }}
              className="mr-[1.25rem]"
            />
            <ParticipantName />
            <UserDefinedConnectionQualityIndicator />
          </>
        )}
      </div> */}
    </div>
  );
};

export default React.memo(FocusedVideoTrack);
