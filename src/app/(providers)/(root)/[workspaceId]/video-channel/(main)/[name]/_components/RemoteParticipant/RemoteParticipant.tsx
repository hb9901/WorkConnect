import {
  CarouselLayout,
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

  const renderTrackRef = useCallback(
    (trackRef: TrackReferenceOrPlaceholder) => <RenderTrack trackRef={trackRef} isMobile={isMobile} />,
    [isMobile]
  );

  const carouselTracks = useMemo(() => (isMobile && trackRefs ? trackRefs : tracks), [isMobile, trackRefs, tracks]);

  return (
    <CarouselLayout
      tracks={carouselTracks}
      orientation="vertical"
      className={`w-full h-[88%] mx-2 py-2 flex flex-col gap-[0.2rem] items-center overflow-auto scroll-container `}
    >
      <TrackRefContext.Consumer>{(trackRef) => trackRef && renderTrackRef(trackRef)}</TrackRefContext.Consumer>
    </CarouselLayout>
  );
});

export default ParticipantListLayout;
