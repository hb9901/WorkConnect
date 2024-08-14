import clsx from 'clsx';
import React from 'react';
export interface BottomSheetModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheetModal = ({ className, isOpen, onClose, children, ...props }: BottomSheetModalProps) => {
  return (
    <>
      {isOpen && <div className="absolute inset-0 bg-black opacity-40 lg:opacity-0" onClick={onClose} />}
      <div className="relative">
        <div
          className={clsx(
            `absolute inset-0 transition-all duration-400 ${isOpen ? 'flex h-full' : 'hidden h-0'} z-50
        lg:right-0 lg:top-0`,
            className
          )}
        >
          <div
            className={`fixed flex flex-col bottom-0 left-0 right-0 bg-white rounded-t-2xl overflow-hidden ${
              isOpen ? 'max-h-[calc(100%-50px)]' : 'max-h-0'
            } lg:left-auto lg:right-[calc((100%-403px)/3)] lg:bottom-auto lg:top-auto lg:rounded-[6px] lg:px-[8px] lg:py-[8px] lg:items-center`}
            {...props}
          >
            <div className="flex justify-center p-3 lg:hidden" onClick={onClose}>
              <div className="w-20 h-1 bg-grey900 rounded flex-shrink-0" />
            </div>

            <div className="p-4 flex-grow overflow-y-auto w-full lg:p-[0]">
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomSheetModal;
