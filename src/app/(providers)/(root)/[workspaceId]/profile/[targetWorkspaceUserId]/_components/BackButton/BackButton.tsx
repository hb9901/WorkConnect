'use client';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import ArrowLeftIcon from '@/icons/ArrowLeft.svg';
import XIcon from '@/icons/X.svg';
import useUserStore from '@/store/userStore';
import Link from 'next/link';

interface BackButtonProps {
  type?: 'edit' | 'profile' | 'myPage';
}

const BackButton = ({ type = 'profile' }: BackButtonProps) => {
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);

  return (
    <button>
      <Link
        href={type !== 'edit' ? `/${workspaceId}` : `/${workspaceId}/profile/${workspaceUserId}`}
        className="flex items-center justify-start w-[24px] h-[24px]"
        scroll={false}
      >
        <ArrowLeftIcon className="lg:hidden" />
        <XIcon className="hidden lg:flex" />
      </Link>
    </button>
  );
};

export default BackButton;
