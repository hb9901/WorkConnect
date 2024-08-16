import Typography from '@/components/Typography';
import CameraPlaceholderIcon from '@/icons/CameraPlaceholder.svg';
import MinimizeIcon from '@/icons/Minimize.svg';
import {
  isTrackReference,
  ParticipantName,
  TrackMutedIndicator,
  TrackReferenceOrPlaceholder,
  VideoTrack
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import useDeviceType from '../../../../_hooks/useDeviceType';
import useFocosedTrack from '../../_store/useFocusTrack';
import UserDefinedConnectionQualityIndicator from '../UserDefinedConnectionQualityIndicator';
type FocusedVideoTrackProps = {
  focusedTrackRef: TrackReferenceOrPlaceholder;
};

const FocusedVideoTrack = ({ focusedTrackRef }: FocusedVideoTrackProps) => {
  const { setFocusedTrack } = useFocosedTrack();
  const { isMobile } = useDeviceType();
  const handleClickUnfocus = () => {
    setFocusedTrack(undefined);
  };

  return (
    <div className="relative h-[88%] bg-grey700Black/[0.3] rounded-[5px] ">
      {isTrackReference(focusedTrackRef) && !focusedTrackRef.publication.isMuted ? (
        <VideoTrack trackRef={focusedTrackRef} className="object-cover" />
      ) : (
        <div className="w-full  h-full flex items-center justify-center bg-slate-500">
          <CameraPlaceholderIcon size="7" />
        </div>
      )}
      <div className="absolute bottom-0 left-0 bg-slate-300/[0.5] gap-1 flex justify-center items-center px-1">
        {focusedTrackRef.source !== Track.Source.ScreenShare && (
          <>
            <TrackMutedIndicator
              trackRef={{
                participant: focusedTrackRef.participant,
                source: Track.Source.Microphone
              }}
              className="mr-[1.25rem]"
            />
            <ParticipantName />
            <UserDefinedConnectionQualityIndicator />
          </>
        )}
      </div>
      {!isMobile && (
        <div className="absolute top-0 right-0 m-2 ">
          <button
            onClick={handleClickUnfocus}
            className="flex items-center justify-center px-2 py-1 bg-white rounded-[50px] "
          >
            <MinimizeIcon className="scale-75" />
            <Typography color="grey700Black">최소화</Typography>
          </button>
        </div>
      )}
    </div>
  );
};

export default FocusedVideoTrack;
