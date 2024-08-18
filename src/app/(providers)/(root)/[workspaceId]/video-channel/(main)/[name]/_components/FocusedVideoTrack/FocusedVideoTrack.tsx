import { isTrackReference, isTrackReferencePinned } from '@livekit/components-core';
import {
  AudioTrack,
  ParticipantName,
  TrackMutedIndicator,
  TrackReferenceOrPlaceholder,
  useFeatureContext,
  useMaybeLayoutContext,
  VideoTrack
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useCallback } from 'react';
import useDeviceType from '../../../../_hooks/useDeviceType';
import useFocosedTrack from '../../_store/useFocusTrack';
import UserDefinedConnectionQualityIndicator from '../UserDefinedConnectionQualityIndicator';
type FocusedVideoTrackProps = {
  focusedTrackRef: TrackReferenceOrPlaceholder;
};

const FocusedVideoTrack = ({ focusedTrackRef }: FocusedVideoTrackProps) => {
  const layoutContext = useMaybeLayoutContext();
  const { setFocusedTrack } = useFocosedTrack();

  const { isMobile } = useDeviceType();
  const handleClickUnfocus = () => {
    setFocusedTrack(undefined);
  };

  const handleSubscribe = useCallback(
    (subscribed: boolean) => {
      if (
        focusedTrackRef.source &&
        !subscribed &&
        layoutContext &&
        layoutContext.pin.dispatch &&
        isTrackReferencePinned(focusedTrackRef, layoutContext.pin.state)
      ) {
        layoutContext.pin.dispatch({ msg: 'clear_pin' });
      }
    },
    [focusedTrackRef, layoutContext]
  );

  const autoManageSubscription = useFeatureContext()?.autoSubscription;
  return (
    <div className={`relative bg-grey700Black/[0.3] rounded-[5px] 'h-[88%]' `}>
      {isTrackReference(focusedTrackRef) &&
      (Track.Source.Camera === focusedTrackRef.source || Track.Source.ScreenShare === focusedTrackRef.source) ? (
        <div>
          <VideoTrack
            trackRef={focusedTrackRef}
            onSubscriptionStatusChanged={handleSubscribe}
            manageSubscription={autoManageSubscription}
          />
        </div>
      ) : (
        isTrackReference(focusedTrackRef) && (
          <AudioTrack trackRef={focusedTrackRef} onSubscriptionStatusChanged={handleSubscribe} />
        )
      )}
      <div className="absolute bottom-0 left-0 bg-slate-300/[0.5] gap-1 flex justify-center items-center px-1">
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
      </div>
    </div>
  );
};

export default FocusedVideoTrack;
