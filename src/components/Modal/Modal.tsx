import XIcon from '@/icons/X.svg';
import React from 'react';
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isModal?: boolean;
}

const Modal = ({ isOpen, onClose, children, isModal = true, ...props }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {isOpen && <div className="fixed inset-0 bg-black opacity-40" onClick={onClose} />}
      <div className="fixed bg-white rounded-lg p-[10px] flex flex-col items-center" {...props}>
        {isModal && (
          <button onClick={onClose} className="self-end text-gray-700 cursor-pointer">
            <XIcon />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
