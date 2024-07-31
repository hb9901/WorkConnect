import { MediaDeviceMenu, usePersistentUserChoices } from '@livekit/components-react';

const DeviceMenu = () => {
  const { saveAudioInputDeviceId, saveVideoInputDeviceId } = usePersistentUserChoices();
  return (
    <div>
      <h1>오디오 장치 선택</h1>
      <div className="">
        <MediaDeviceMenu
          kind="audioinput"
          onActiveDeviceChange={(_kind, deviceId) => saveAudioInputDeviceId(deviceId ?? '')}
        />
      </div>
    </div>
  );
};

export default DeviceMenu;
