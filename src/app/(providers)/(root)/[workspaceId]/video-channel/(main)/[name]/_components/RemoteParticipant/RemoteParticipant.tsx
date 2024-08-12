import CameraPlaceholderIcon from '@/icons/CameraPlaceholder.svg';
import {
  CarouselLayout,
  isTrackReference,
  ParticipantClickEvent,
  ParticipantName,
  TrackMutedIndicator,
  TrackRefContext,
  TrackReferenceOrPlaceholder,
  useConnectionQualityIndicator,
  useTracks,
  VideoTrack
} from '@livekit/components-react';
import { ConnectionQuality, Track } from 'livekit-client';
import React, { useCallback, useMemo } from 'react';
import useDeviceType from '../../../../_hooks/useDeviceType';
import useFocosedTrack from '../../_store/useFocusTrack';

type ParticipantListLayoutProps = {
  trackRefs?: TrackReferenceOrPlaceholder[];
};

const ParticipantListLayout = React.memo(({ trackRefs }: ParticipantListLayoutProps) => {
  const { isMobile } = useDeviceType();
  const { focusedTrack, setFocusedTrack } = useFocosedTrack();

  const tracksConfig = useMemo(
    () => [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false }
    ],
    []
  );

  const tracks = useTracks(tracksConfig);

  const clickFocus = useCallback(
    (e: ParticipantClickEvent) => {
      if (e.participant.identity === focusedTrack?.participant.identity) {
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

  const renderTrackRef = useCallback(
    (trackRef: TrackReferenceOrPlaceholder) => (
      <div
        className={`relative aspect-square ${
          isMobile ? 'w-[150px] h-[150px] mr-4 mt-5' : 'w-[281px] h-[281px]'
        } bg-grey700Black rounded-[14px] overflow-hidden my-1 shadow-md`}
      >
        {isTrackReference(trackRef) && !trackRef.publication.videoTrack!.isMuted ? (
          <VideoTrack trackRef={trackRef} onTrackClick={clickFocus} />
        ) : (
          <div className="w-full  h-full flex items-center justify-center ">
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
            </>
          )}
          <UserDefinedConnectionQualityIndicator />
        </div>
      </div>
    ),
    [isMobile, clickFocus]
  );

  const carouselTracks = useMemo(() => (isMobile && trackRefs ? trackRefs : tracks), [isMobile, trackRefs, tracks]);

  return (
    <CarouselLayout tracks={carouselTracks} orientation="vertical" className={`w-full flex flex-col justify-end`}>
      <TrackRefContext.Consumer>{(trackRef) => trackRef && renderTrackRef(trackRef)}</TrackRefContext.Consumer>
    </CarouselLayout>
  );
});

export default ParticipantListLayout;

export const UserDefinedConnectionQualityIndicator = React.memo(() => {
  const { quality } = useConnectionQualityIndicator();

  const qualityToCircle = useCallback((quality: ConnectionQuality) => {
    switch (quality) {
      case ConnectionQuality.Poor:
        return <div className="rounded-full bg-caution/[0.5] w-[6px] h-[6px]" />;
      case ConnectionQuality.Good:
        return <div className="rounded-full bg-information/[0.5] w-[6px] h-[6px]" />;
      case ConnectionQuality.Excellent:
        return <div className="rounded-full bg-success/[0.5] w-[6px] h-[6px]" />;
      case ConnectionQuality.Lost:
        return <div className="rounded-full bg-error/[0.5] w-[6px] h-[6px]" />;
      default:
        return null;
    }
  }, []);

  return qualityToCircle(quality);
});
