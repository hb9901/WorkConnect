import {
  CarouselLayout,
  ParticipantClickEvent,
  TrackRefContext,
  TrackReferenceOrPlaceholder,
  useSpeakingParticipants,
  useTracks
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import React, { useCallback, useEffect, useMemo } from 'react';
import useDeviceType from '../../../../_hooks/useDeviceType';
import useFocosedTrack from '../../_store/useFocusTrack';
import RenderTrack from '../RenderTrack/RenderTrack';

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

  const renderTrackRef = useCallback(
    (trackRef: TrackReferenceOrPlaceholder) => (
      <RenderTrack trackRef={trackRef} isMobile={isMobile} onTrackClick={handleClickFocus} />
    ),
    [isMobile, handleClickFocus]
  );

  const carouselTracks = useMemo(() => (isMobile && trackRefs ? trackRefs : tracks), [isMobile, trackRefs, tracks]);

  return (
    <CarouselLayout tracks={carouselTracks} orientation="vertical" className={`w-full flex flex-col items-center`}>
      <TrackRefContext.Consumer>{(trackRef) => trackRef && renderTrackRef(trackRef)}</TrackRefContext.Consumer>
    </CarouselLayout>
  );
});

export default ParticipantListLayout;
