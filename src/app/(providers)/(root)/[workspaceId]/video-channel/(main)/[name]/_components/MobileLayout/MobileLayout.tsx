import {
  TrackReferenceOrPlaceholder,
  useLocalParticipant,
  usePersistentUserChoices,
  usePreviewTracks
} from '@livekit/components-react';
import VideoChannel from '../../../_components/VideoChannel';
import RemoteParticipant from '../RemoteParticipant';

type MobileLayoutProps = {
  tracks: TrackReferenceOrPlaceholder[];
};

const MobileLayout = ({ tracks }: MobileLayoutProps) => {
  const { localParticipant } = useLocalParticipant();
  const { userChoices } = usePersistentUserChoices();

  const filteredTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid);
  const localTracks = usePreviewTracks({
    audio: userChoices.audioEnabled ? { deviceId: userChoices.audioDeviceId } : false,
    video: userChoices.videoEnabled ? { deviceId: userChoices.videoDeviceId } : false
  });

  //   <div className="flex items-center justify-center bg-[#121212] rounded-[10px] h-[55vh] overflow-hidden mx-auto aspect-w-16 aspect-h-9">
  //   <video
  //     className="transform scale-x-[-1] w-full h-full object-cover"
  //     ref={videoEl}
  //     data-lk-facing-mode={facingMode}
  //   />
  // </div>
  return (
    <div className={`relative h-full w-full `}>
      <VideoChannel
        tracks={localTracks}
        username={userChoices.username}
        videoEnabled={userChoices.videoEnabled}
        audioEnabled={userChoices.audioEnabled}
      />
      <div className=" absolute top-0 w-[33vw] h-[100px]  right-0">
        <RemoteParticipant />
      </div>
    </div>
  );
};

export default MobileLayout;
