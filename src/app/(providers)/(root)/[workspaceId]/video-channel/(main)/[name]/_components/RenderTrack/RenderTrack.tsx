import CameraPlaceholderIcon from '@/icons/CameraPlaceholder.svg';
import {
  isTrackReference,
  ParticipantClickEvent,
  ParticipantName,
  TrackMutedIndicator,
  TrackReferenceOrPlaceholder,
  VideoTrack
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import React from 'react';
import UserDefinedConnectionQualityIndicator from '../UserDefinedConnectionQualityIndicator';

interface RenderTrackProps {
  trackRef: TrackReferenceOrPlaceholder;
  isMobile: boolean;
  onTrackClick: (e: ParticipantClickEvent) => void;
}

const RenderTrack: React.FC<RenderTrackProps> = React.memo(({ trackRef, isMobile, onTrackClick }) => {
  const isTrack = isTrackReference(trackRef);

  return (
    <div
      id="VideoTrack"
      className={`relative aspect-square ${
        isMobile ? 'w-[150px] h-[150px] mr-4 mt-5' : 'w-[281px] h-[281px]'
      } bg-grey700Black rounded-[14px] overflow-hidden my-1 shadow-md`}
    >
      {isTrack && !trackRef.publication.videoTrack!.isMuted ? (
        <VideoTrack trackRef={trackRef} onTrackClick={(e) => onTrackClick(e)} />
      ) : (
        <div className="w-full h-full flex items-center justify-center ">
          <CameraPlaceholderIcon size="7" />
        </div>
      )}
      <div className="absolute bottom-0 left-0 bg-slate-300/[0.5] gap-1 flex justify-center items-center px-1">
        {trackRef.source !== Track.Source.ScreenShare && (
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
        )}
      </div>
    </div>
  );
});

export default RenderTrack;
