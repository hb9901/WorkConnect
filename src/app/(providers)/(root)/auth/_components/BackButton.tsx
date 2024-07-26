'use client';
import { useRouter } from 'next/navigation';

type BackButtonProps = {
  className?: string;
};

const BackButton = ({ className = '' }: BackButtonProps) => {
  const route = useRouter();
  return (
    <button onClick={() => route.back()} className={`text-[20px] font-bold text-[#333333] ${className}`}>
      ←
    </button>
  );
};

export default BackButton;
