import useBottomsheetModalBackDropStore from '@/store/bottomsheetModalBackDropStore';
import { StrictPropsWithChildren } from '@/types/common';
export interface BottomSheetModalProps {
  isUp?: boolean;
  onClose: () => void;
}

const BottomSheetModal = ({ isUp = false, children }: StrictPropsWithChildren<BottomSheetModalProps>) => {
  const isOpen2 = useBottomsheetModalBackDropStore((state) => state.isOpen);
  const setClose = useBottomsheetModalBackDropStore((state) => state.setClose);

  return (
    <>
      {isOpen2 && <div className="absolute inset-0 bg-black opacity-40 lg:opacity-0 z-[49]" onClick={setClose} />}
      <div className="absolute flex h-full lg:relative z-50">
        <div
          className={`fixed overflow-hidden max-h-[calc(100%-50px)] flex flex-col bottom-0 left-0 right-0 rounded-t-2xl bg-white
          lg:absolute lg:overflow-visible 
          ${isOpen2 ? 'flex' : 'hidden'}`}
        >
          <div className="flex justify-center p-3 lg:hidden" onClick={setClose}>
            <div className="w-20 h-1 bg-grey900 rounded flex-shrink-0" />
          </div>
          <div
            className={`bg-white shadow-md rounded-[6px]
            lg:fixed lg:w-[375px] lg:-translate-x-[calc(100%+24px)] ${isUp && 'lg:-translate-y-[calc(100%-78px)]'}`}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomSheetModal;
