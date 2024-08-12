import {
  FocusLayout,
  FocusLayoutContainer,
  isTrackReference,
  useLocalParticipant,
  VideoTrack
} from '@livekit/components-react';
import { useEffect } from 'react';
import useFocosedTrack from '../../_store/useFocusTrack';
import { VideoConferenceProps } from '../../_types/VideoConforenceProps';
import RemoteParticipant from '../RemoteParticipant';

const MobileLayout = ({ tracks }: VideoConferenceProps) => {
  const { localParticipant } = useLocalParticipant();

  const { focusedTrack, setFocusedTrack } = useFocosedTrack();

  useEffect(() => {
    const filteredTrack = tracks.filter((track) => track.participant.sid === localParticipant.sid)[0];
    setFocusedTrack(filteredTrack);
  }, []);

  return (
    <div className={`relative h-full w-screen `}>
      {focusedTrack && (
        <FocusLayoutContainer className="h-full w-full flex justify-center my-1">
          <FocusLayout trackRef={focusedTrack} className="w-screen min-h-screen -z-10">
            {isTrackReference(focusedTrack) && <VideoTrack trackRef={focusedTrack} />}
          </FocusLayout>
        </FocusLayoutContainer>
      )}
      <div className=" absolute top-0 w-[33vw] h-screen mt-1 right-0 ">
        <RemoteParticipant />
      </div>
    </div>
  );
};

export default MobileLayout;
