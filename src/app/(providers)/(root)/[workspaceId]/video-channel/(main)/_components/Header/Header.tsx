'use client';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PrejoinHeader from './PrejoinHeader';
import VideoChannelHeader from './VideoChannelHeader';

export type HeaderProps = {
  back: () => void;
  next: () => void;
};

const Header = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  const [path, setPath] = useState<string>('');
  const back = () => {
    router.back();
  };

  useEffect(() => {
    setPath(pathname.replace(`/${workspaceId}/video-channel`, ''));
  }, [pathname]);
  console.log(path);
  switch (path) {
    case '/prejoin':
      return <PrejoinHeader back={back} next={() => router.push('/video-channel/create')} />;
    default:
      return <VideoChannelHeader back={back} next={() => router.push('/video-channel/create')} />;
  }
};

export default Header;
