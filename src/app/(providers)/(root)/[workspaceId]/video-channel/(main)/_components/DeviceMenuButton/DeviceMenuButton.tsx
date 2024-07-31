import BottomSheet from '@/components/BottomSheet';
import VolumeIcon from '@/icons/Volume2.svg';
import { useState } from 'react';
import DeviceMenu from '../DeviceMenu/DeviceMenu';
const DeviceMenuButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <VolumeIcon />
      </button>
      <BottomSheet isOpen={isOpen} onClose={handleClose}>
        <DeviceMenu />
      </BottomSheet>
    </>
  );
};

export default DeviceMenuButton;
