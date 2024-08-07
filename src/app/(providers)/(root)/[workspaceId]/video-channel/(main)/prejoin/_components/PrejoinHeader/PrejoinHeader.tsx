'use client';
import Button from '@/components/Button';
import Typography from '@/components/Typography';
import ArrowLeftIcon from '@/icons/ArrowLeft.svg';
import { useRouter } from 'next/navigation';
import React from 'react';

const PrejoinHeader = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between px-4 py-3 mt-[2px]">
      <ArrowLeftIcon className="size-7" onClick={() => router.back()} />
      <Typography color="grey700Black" variant="Title20px" as="h2">
        모임
      </Typography>
      <Button theme="text"> </Button>
    </div>
  );
};

export default React.memo(PrejoinHeader);
