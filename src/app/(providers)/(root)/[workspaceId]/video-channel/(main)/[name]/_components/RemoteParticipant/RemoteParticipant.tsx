import {
  isTrackReference,
  ParticipantClickEvent,
  useLocalParticipant,
  useTracks,
  VideoTrack
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useState } from 'react';

type RemoteParticipantProps = {
  onParticipantClick?: (e: ParticipantClickEvent) => void;
};

const RemoteParticipant = ({ onParticipantClick }: RemoteParticipantProps) => {
  const { localParticipant } = useLocalParticipant();
  const tracks = useTracks([Track.Source.Camera], { onlySubscribed: true });

  const [videoHeight, setVideoHeight] = useState<number>(0);

  const localTrack = tracks.filter((track) => track.participant.sid === localParticipant.sid);
  const remotesTrack = tracks.filter((track) => track.participant.sid !== localParticipant.sid);

  const tr = [...localTrack, ...remotesTrack];

  return (
    <>
      {tr.map((remoteTrack) => {
        if (isTrackReference(remoteTrack)) {
          return (
            <div id="VideoTrackWrapper" className={`aspect-square mb-2 w-[182px] rounded-[14px] overflow-hidden`}>
              <VideoTrack trackRef={remoteTrack} className="object-cover" />
            </div>
          );
        }
      })}
    </>
  );
};

export default RemoteParticipant;
