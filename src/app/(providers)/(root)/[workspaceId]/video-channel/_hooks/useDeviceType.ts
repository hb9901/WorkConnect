import { useEffect, useState } from 'react';
import useWindowSize from './useWindowSize';

const MOBILE_BREAKPOINT = 768; // 768px 이하일 경우 모바일로 간주

type DeviceType = 'mobile' | 'desktop';

interface DeviceInfo {
  device: DeviceType;
  isMobile: boolean;
}

const useDeviceType = (): DeviceInfo => {
  const { width } = useWindowSize();
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    device: 'desktop',
    isMobile: false
  });

  useEffect(() => {
    if (width !== undefined) {
      const isMobile = width <= MOBILE_BREAKPOINT;
      setDeviceInfo({
        device: isMobile ? 'mobile' : 'desktop',
        isMobile: isMobile
      });
    }
  }, [width]);

  return deviceInfo;
};

export default useDeviceType;
