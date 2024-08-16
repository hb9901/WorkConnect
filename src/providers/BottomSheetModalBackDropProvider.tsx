'use client';

import BottomSheetModalBackDrop from '@/components/BottomSheetModalBackDrop';
import useBottomsheetModalBackDropStore from '@/store/bottomsheetModalBackDropStore';
import { StrictPropsWithChildren } from '@/types/common';

const BottomSheetModalBackDropProvider = ({ children }: StrictPropsWithChildren) => {
  const isOpen = useBottomsheetModalBackDropStore((state) => state.isOpen);
  return (
    <>
      {children}
      {isOpen && <BottomSheetModalBackDrop />}
    </>
  );
};

export default BottomSheetModalBackDropProvider;
