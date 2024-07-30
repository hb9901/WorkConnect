import { useState } from 'react';
import Button from '../Button';
import Modal, { ModalProps } from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '모달/다이얼로그 내용을 지정합니다.',
      defaultValue: '내용'
    },
    isOpen: {
      description: '모달/다이얼로그 열림 여부를 나타내는 boolean 값입니다.',
      control: 'boolean',
      defaultValue: false
    },
    onClose: {
      description: '모달/다이얼로그 닫힐 때 호출되는 함수입니다.',
      action: 'onClose'
    },
    isModal: {
      description: '모달/다이얼로그를 선택하는 Boolean 값입니다.',
      control: 'boolean'
    }
  }
};

export const DefaultModal = (args: ModalProps) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  return (
    <div>
      <Button theme="primary" onClick={() => setIsOpen(true)}>
        Open
      </Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} isModal={!args.isModal}>
        <p className="p-4">Modal content</p>
      </Modal>
    </div>
  );
};

export const Dialog = (args: ModalProps) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  return (
    <div>
      <Button theme="primary" onClick={() => setIsOpen(true)}>
        Open
      </Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} isModal={false}>
        <p className="p-4">Dialog content</p>
      </Modal>
    </div>
  );
};
