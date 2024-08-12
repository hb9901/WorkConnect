'use client';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import ArrowLeftIcon from '@/icons/ArrowLeft.svg';
import Link from 'next/link';

const BackButton = () => {
  const workspaceId = useWorkspaceId();

  return (
    <button>
      <Link href={`/${workspaceId}`} className="flex items-center justify-start w-[24px] h-[24px]" scroll={false}>
        <ArrowLeftIcon className="" />
      </Link>
    </button>
  );
};

export default BackButton;
