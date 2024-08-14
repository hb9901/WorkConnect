import CameraPlaceholderIcon from '@/icons/CameraPlaceholder.svg';
import {
  CarouselLayout,
  isTrackReference,
  ParticipantClickEvent,
  ParticipantName,
  TrackMutedIndicator,
  TrackRefContext,
  TrackReferenceOrPlaceholder,
  useSpeakingParticipants,
  useTracks,
  VideoTrack
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import React, { useCallback, useEffect, useMemo } from 'react';
import useDeviceType from '../../../../_hooks/useDeviceType';
import useFocosedTrack from '../../_store/useFocusTrack';
import UserDefinedConnectionQualityIndicator from '../UserDefinedConnectionQualityIndicator';

type ParticipantListLayoutProps = {
  trackRefs?: TrackReferenceOrPlaceholder[];
};

const ParticipantListLayout = React.memo(({ trackRefs }: ParticipantListLayoutProps) => {
  const { isMobile } = useDeviceType();
  const { focusedTrack, setFocusedTrack } = useFocosedTrack();
  const activeSpeakers = useSpeakingParticipants();

  const tracksConfig = useMemo(
    () => [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false }
    ],
    []
  );

  const tracks = useTracks(tracksConfig);

  useEffect(() => {
    const screenShareTrack = tracks.filter((track) => track.source === Track.Source.ScreenShare)[0];
    setFocusedTrack(screenShareTrack);
  }, [tracks]);

  useEffect(() => {
    const speakerTrack = tracks.filter((track) => track.participant === activeSpeakers[0])[0];
    if (focusedTrack?.source !== Track.Source.ScreenShare) {
      setFocusedTrack(speakerTrack);
    }
  }, [activeSpeakers]);

  const handelClickFocus = useCallback(
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

  const renderTrackRef = useCallback(
    (trackRef: TrackReferenceOrPlaceholder) => (
      <div
        id="VideoTrack"
        className={`relative aspect-square ${
          isMobile ? 'w-[150px] h-[150px] mr-4 mt-5' : 'w-[281px] h-[281px]'
        } bg-grey700Black rounded-[14px] overflow-hidden my-1 shadow-md`}
      >
        {isTrackReference(trackRef) && !trackRef.publication.videoTrack!.isMuted ? (
          <VideoTrack trackRef={trackRef} onTrackClick={handelClickFocus} />
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
              <UserDefinedConnectionQualityIndicator />
            </>
          )}
        </div>
      </div>
    ),
    [isMobile, handelClickFocus]
  );

  const carouselTracks = useMemo(() => (isMobile && trackRefs ? trackRefs : tracks), [isMobile, trackRefs, tracks]);

  return (
    <CarouselLayout tracks={carouselTracks} orientation="vertical" className={`w-full flex flex-col items-center`}>
      <TrackRefContext.Consumer>{(trackRef) => trackRef && renderTrackRef(trackRef)}</TrackRefContext.Consumer>
    </CarouselLayout>
  );
});

export default ParticipantListLayout;
