import { isTrackReference, TrackLoop, TrackRefContext, TrackReferenceOrPlaceholder } from '@livekit/components-react';
import RenderTrack from '../RenderTrack/RenderTrack';

type PaticipantTilesProps = {
  tracks: TrackReferenceOrPlaceholder[];
};

const ParticipantTiles = ({ tracks }: PaticipantTilesProps) => {
  const renderTrackRef = (trackRef: TrackReferenceOrPlaceholder) => (
    <RenderTrack trackRef={trackRef} isMobile={false} size={341} />
  );
  return (
    <div className="w-full flex justify-center items-center h-[110%] p-5 gap-5 lg:scroll-container">
      {tracks && (
        <TrackLoop tracks={tracks}>
          <TrackRefContext.Consumer>
            {(trackRef) => isTrackReference(trackRef) && renderTrackRef(trackRef)}
          </TrackRefContext.Consumer>
        </TrackLoop>
      )}
    </div>
  );
};

export default ParticipantTiles;
