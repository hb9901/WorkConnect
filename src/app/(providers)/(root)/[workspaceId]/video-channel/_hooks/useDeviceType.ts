import { useEffect, useState } from 'react';
import useWindowSize from './useWindowSize';

const MOBILE_BREAKPOINT = 768; // 768px 이하일 경우 모바일로 간주

type DeviceType = 'mobile' | 'desktop';

const useDeviceType = (): DeviceType => {
  const { width } = useWindowSize();
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    if (width !== undefined) {
      setDeviceType(width <= MOBILE_BREAKPOINT ? 'mobile' : 'desktop');
    }
  }, [width]);

  return deviceType;
};

export default useDeviceType;
