import Button from '@/components/Button';
import Typography from '@/components/Typography';
import SpeakerIcon from '@/icons/Volume2.svg';
import useAudioOutput from '../../../_hooks/useAudioOutput';
const DeviceMenu = () => {
  const { devices, setAudioOutputDevice } = useAudioOutput();

  const handleDeviceChange = (deviceId: string) => {
    setAudioOutputDevice(deviceId);
  };
  return (
    <div>
      <div className="">
        <Typography variant="Title18px" color="grey700Black">
          오디오 장치 선택
        </Typography>
        <ul className="">
          {devices.length === 0 && <li>No audio output devices found.</li>}
          {devices.map((device) => (
            <li
              key={device.deviceId}
              onClick={() => handleDeviceChange(device.deviceId)}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center gap-3"
            >
              <SpeakerIcon className="w-[22px]" />
              <Typography variant="Body14px" color="grey600">
                {device.label || `Device ${device.deviceId}`}
              </Typography>
            </li>
          ))}
        </ul>
        <Button theme="primary" isFullWidth>
          다음
        </Button>
      </div>
    </div>
  );
};

export default DeviceMenu;
