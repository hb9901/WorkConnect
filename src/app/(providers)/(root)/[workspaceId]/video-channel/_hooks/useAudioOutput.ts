import { RefObject, useEffect, useRef, useState } from 'react';

interface Device {
  deviceId: string;
  kind: string;
  label: string;
}

const useAudioOutput = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const audioRef: RefObject<HTMLAudioElement> = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const audioOutputDevices = devices.filter((device) => device.kind === 'audiooutput');
        setDevices(audioOutputDevices);
      })
      .catch((err) => {
        console.error(`Error: ${err.name}: ${err.message}`);
      });
  }, []);

  const setAudioOutputDevice = (deviceId: string) => {
    if (audioRef.current && typeof audioRef.current.sinkId !== 'undefined') {
      audioRef.current
        .setSinkId(deviceId)
        .then(() => {
          console.log(`Success, audio output device attached: ${deviceId}`);
        })
        .catch((error) => {
          console.error(`Error: ${error.name}: ${error.message}`);
        });
    } else {
      console.warn('Browser does not support output device selection.');
    }
  };

  return { audioRef, devices, setAudioOutputDevice };
};

export default useAudioOutput;
