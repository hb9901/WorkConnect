'use client';

import TimeModal from '@/components/TimeModal';
import useTimeModalStore from '@/store/timeModalStore';
import { PropsWithChildren } from 'react';

const ModalProvider = ({ children }: PropsWithChildren) => {
  const { isTimeModalOpen, startTime, endTime } = useTimeModalStore();

  return (
    <>
      {children}
      {isTimeModalOpen && <TimeModal />}
    </>
  );
};

export default ModalProvider;
