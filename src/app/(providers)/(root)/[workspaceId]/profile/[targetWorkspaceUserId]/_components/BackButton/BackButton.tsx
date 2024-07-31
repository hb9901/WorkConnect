'use client';
import ArrowLeftIcon from '@/icons/ArrowLeft.svg';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button className="flex items-center justify-start w-[24px] h-[24px]" onClick={handleClick}>
      <ArrowLeftIcon className="" />
    </button>
  );
};

export default BackButton;
