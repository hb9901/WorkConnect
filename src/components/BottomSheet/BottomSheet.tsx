import clsx from 'clsx';
import React from 'react';
export interface BottomSheetProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({ className, isOpen, onClose, children, ...props }: BottomSheetProps) => {
  return (
    <div className={clsx(`fixed inset-0 transition-all duration-400 ${isOpen ? 'h-full' : 'h-0'}`, className)}>
      {isOpen && <div className="fixed inset-0 bg-black opacity-40" onClick={onClose} />}
      <div
        className={`fixed flex flex-col bottom-0 left-0 right-0 bg-white rounded-t-2xl transition-all duration-200 ${
          isOpen ? 'max-h-[calc(100%-50px)]' : 'max-h-0'
        } overflow-hidden`}
        {...props}
      >
        <div className="flex justify-center p-3" onClick={onClose}>
          <div className="w-20 h-1 bg-grey900 rounded flex-shrink-0" />
        </div>
        <div className="p-4 flex-grow overflow-y-auto">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
