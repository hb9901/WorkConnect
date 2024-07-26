import React from 'react';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  return (
    <div className={`fixed inset-0 ${isOpen ? 'h-full' : 'h-0'} transition-height duration-300`}>
      {isOpen && <div className="fixed inset-0 bg-black opacity-20" onClick={onClose} />}
      <div
        className={`fixed flex flex-col bottom-0 left-0 right-0 bg-white rounded-t-2xl ${isOpen ? '' : 'h-0'} max-h-[calc(100%-50px)] overflow-hidden transition-height duration-300`}
      >
        <div className="flex justify-center p-3">
          <div className="w-20 h-1 bg-grey900 rounded flex-shrink-0" onClick={onClose} />
        </div>
        <div className="p-4 flex-grow overflow-y-auto">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
