'use client';

import { XIcon } from '@/icons';
import { useRouter } from 'next/navigation';

const BackArrowButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button
      className="hidden lg:flex items-center justify-start w-[24px] h-[24px] lg:size-[20px]"
      onClick={handleClick}
    >
      <XIcon className="w-full h-full" />
    </button>
  );
};

export default BackArrowButton;
