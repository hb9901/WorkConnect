'use client';
import Button from '@/components/Button';
import Typography from '@/components/Typography';
import ChevronLeftIcon from '@/icons/ChevronLeft.svg';
import { useRouter } from 'next/navigation';
import React from 'react';
import useDeviceType from '../../../../_hooks/useDeviceType';

//  Test Comment
const PrejoinHeader = () => {
  const router = useRouter();
  const { isMobile } = useDeviceType();
  return (
    <header className={`fixed top-0 left-0 right-0 z-10 shadow-m ${isMobile ? 'bg-white' : 'bg-[#F4F4F6]'}`}>
      <div className={`flex items-center justify-between px-4 py-3 mt-[2px] `}>
        <ChevronLeftIcon className="size-6" stroke="#2F323C" onClick={() => router.back()} />
        <Typography color="grey700Black" variant="Title20px" as="h2">
          모임
        </Typography>
        <Button theme="text"> </Button>
      </div>
    </header>
  );
};

export default React.memo(PrejoinHeader);
