import { useEffect, useState } from 'react';
import Button from '../Button';
import BottomSheet, { BottomSheetProps } from './BottomSheet';

export default {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      description: '바텀시트 열림 여부를 나타내는 boolean 값입니다.',
      control: 'boolean',
      defaultValue: false
    },
    onClose: {
      description: '바텀시트가 닫힐 때 호출되는 함수입니다.',
      action: 'onClose'
    }
  }
};

export const Default = (args: BottomSheetProps) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    args.onClose();
  };

  return (
    <>
      <Button onClick={handleOpen} theme="primary200" isDisabled={false}>
        Open
      </Button>
      <BottomSheet {...args} isOpen={isOpen} onClose={handleClose}>
        <p>BottomSheet 열림</p>
      </BottomSheet>
    </>
  );
};
