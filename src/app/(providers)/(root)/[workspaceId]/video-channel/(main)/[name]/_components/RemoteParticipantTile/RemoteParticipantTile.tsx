import { ParticipantTile, ParticipantTileProps, useEnsureTrackRef } from '@livekit/components-react';

const RemoteParticipantTile = ({ trackRef }: ParticipantTileProps) => {
  // livekit - hook
  const remote = useEnsureTrackRef(trackRef);

  return <ParticipantTile className={``} />;
};

export default RemoteParticipantTile;
