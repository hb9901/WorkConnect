import { TrackReferenceOrPlaceholder, useLocalParticipant, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useEffect, useRef } from 'react';
const LocalParticipantTile = () => {
  const { localParticipant } = useLocalParticipant();
  // {
  //   isMicrophoneEnabled: boolean;
  //   isScreenShareEnabled: boolean;
  //   isCameraEnabled: boolean;
  //   microphoneTrack: TrackPublication | undefined;
  //   cameraTrack: TrackPublication | undefined;
  //   lastMicrophoneError: Error | undefined;
  //   lastCameraError: Error | undefined;
  //   localParticipant: LocalParticipant;
  // }
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.ScreenShare, withPlaceholder: false }
  ]);

  const localTrack = useRef<TrackReferenceOrPlaceholder>();

  useEffect(() => {
    const filteredTrack = tracks.filter((track) => track.participant.sid === localParticipant.sid)[0];
    // setFocusedTrack(filteredTrack);
  }, []);
  return <div>LocalParticipantTile</div>;
};

export default LocalParticipantTile;
