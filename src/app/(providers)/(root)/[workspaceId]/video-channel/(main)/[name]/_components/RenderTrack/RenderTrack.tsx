import Typography from '@/components/Typography';
import CameraPlaceholderIcon from '@/icons/CameraPlaceholder.svg';
import ScreenShareIcon from '@/icons/Share.svg';
import {
  isTrackReference,
  ParticipantClickEvent,
  ParticipantName,
  TrackMutedIndicator,
  TrackReferenceOrPlaceholder,
  VideoTrack
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import React, { useCallback } from 'react';
import useFocosedTrack from '../../_store/useFocusTrack';
import UserDefinedConnectionQualityIndicator from '../UserDefinedConnectionQualityIndicator';
interface RenderTrackProps {
  trackRef: TrackReferenceOrPlaceholder;
  isMobile?: boolean;
  size?: number;
}

const RenderTrack = React.memo(({ trackRef, isMobile, size = 281 }: RenderTrackProps) => {
  const isTrack = isTrackReference(trackRef);
  const { focusedTrack, setFocusedTrack } = useFocosedTrack();

  const handleClickFocus = useCallback(
    (e: ParticipantClickEvent) => {
      if (e.participant.sid === focusedTrack?.participant.sid && e.track === focusedTrack.publication) {
        return;
      }
      setFocusedTrack({
        participant: e.participant,
        publication: e.participant.getTrackPublication(e.track!.source),
        source: e.track!.source
      });
    },
    [focusedTrack, setFocusedTrack]
  );

  const dimensionClass = isMobile ? 'w-[150px] h-[150px] mr-4 mt-5' : `w-[${size}px] h-[${size}px]`;

  return (
    <div
      id="VideoTrack"
      className={`relative aspect-square ${dimensionClass} bg-grey700Black rounded-[14px] overflow-hidden my-1 shadow-md flex-shrink-0`}
      style={{ width: isMobile ? 150 : size, height: isMobile ? 150 : size }}
    >
      {isTrack && (Track.Source.Camera === trackRef.source || Track.Source.ScreenShare === trackRef.source) ? (
        <VideoTrack trackRef={trackRef} onTrackClick={handleClickFocus} />
      ) : (
        <div className="w-full h-full flex items-center justify-center ">
          <CameraPlaceholderIcon size="7" />
        </div>
      )}
      <div className="absolute bottom-0 left-0 p-1 bg-slate-300/[0.5] gap-1 flex justify-center items-center px-1">
        {trackRef.source !== Track.Source.ScreenShare ? (
          <>
            <TrackMutedIndicator
              trackRef={{
                participant: trackRef.participant,
                source: Track.Source.Microphone
              }}
              className="mr-[1.25rem]"
            />
            {isMobile ? null : <ParticipantName />}
            <UserDefinedConnectionQualityIndicator />
          </>
        ) : (
          <>
            <ScreenShareIcon className="size-4" />
            {isMobile ? null : <ParticipantName />}
            {isMobile ? null : (
              <Typography color="grey900" variant="Body14px">
                {'님의 화면'}
              </Typography>
            )}
            <UserDefinedConnectionQualityIndicator />
          </>
        )}
      </div>
    </div>
  );
});

export default RenderTrack;
