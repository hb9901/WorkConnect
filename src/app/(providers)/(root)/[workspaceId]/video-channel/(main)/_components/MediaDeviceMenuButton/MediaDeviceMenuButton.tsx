import BottomSheet from '@/components/BottomSheet';
import ChevronDownIcon from '@/icons/ChevronDown.svg';
import { LocalAudioTrack, LocalVideoTrack } from 'livekit-client';
import { useState } from 'react';
import MediaDeviceMenu from '../MediaDeviceMenu/MediaDeviceMenu';
type MediaDeviceProps = {
  initialSelection: string;
  kind: MediaDeviceKind;
  disabled: boolean;
  tracks: Partial<Record<MediaDeviceKind, LocalAudioTrack | LocalVideoTrack | undefined>> | undefined;
  onActiveDeviceChange: (_: MediaDeviceKind, id: string) => void;
};

const MediaDeviceMenuButton = ({
  initialSelection,
  kind,
  disabled,
  tracks,
  onActiveDeviceChange
}: MediaDeviceProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="flex flex-col items-center justify-center">
        <ChevronDownIcon className="w-[24px] h-[24px] bottom-0" />
      </button>
      <BottomSheet isOpen={isOpen} onClose={handleClose} className="z-40">
        {kind}
        {disabled}
        {tracks?.audioinput?.getDeviceId()}
        <MediaDeviceMenu
          initialSelection={initialSelection}
          kind={kind}
          disabled={disabled}
          tracks={tracks}
          onActiveDeviceChange={onActiveDeviceChange}
        />
      </BottomSheet>
    </div>
  );
};

export default MediaDeviceMenuButton;
