import { useEffect, useState } from 'react';
import SnackBar, { SnackBarProps } from './SnackBar';

export default {
  title: 'Components/SnackBar',
  component: SnackBar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      description: '스낵바 열림 여부를 나타내는 boolean 값입니다.',
      control: 'boolean',
      defaultValue: false
    },
    message: {
      description: '스낵바에 표시될 메시지입니다.',
      control: 'text',
      defaultValue: '스낵바 메ㅅ지입니다.'
    },
    onClose: {
      description: '스낵바가 닫힐 때 호출되는 함수입니다.',
      action: 'onClose'
    },
    duration: {
      description: '🕑 스낵바가 유지되는 시간입니다.',
      control: 'number',
      defaultValue: 2000
    }
  }
};

export const Default = (args: SnackBarProps) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-nowrap mx-40">
      <button className="px-4 py-2 bg-primary200Main text-white rounded" onClick={handleOpen}>
        Show
      </button>
      <SnackBar {...args} isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

Default.args = {
  isOpen: false,
  message: '스낵바 메시지입니다.',
  duration: 2000
};
