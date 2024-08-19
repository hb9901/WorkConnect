import BottomSheet from '@/components/BottomSheet';
import Modal from '@/components/Modal';
import Typography from '@/components/Typography';
import VolumeIcon from '@/icons/Volume2.svg';
import { useState } from 'react';
import useDeviceType from '../../../_hooks/useDeviceType';
import DeviceMenu from '../DeviceMenu/DeviceMenu';
const DeviceMenuButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isMobile } = useDeviceType();
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="flex flex-col items-center justify-center">
        <VolumeIcon className="w-[24px] h-[24px] bottom-0" />
        <Typography variant="Body12px" color="grey700Black">
          스피커
        </Typography>
      </button>
      {isMobile ? (
        <BottomSheet isOpen={isOpen} onClose={handleClose} className="z-40">
          <DeviceMenu onClose={handleClose} />
        </BottomSheet>
      ) : (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <DeviceMenu onClose={handleClose} />
        </Modal>
      )}
    </>
  );
};

export default DeviceMenuButton;
