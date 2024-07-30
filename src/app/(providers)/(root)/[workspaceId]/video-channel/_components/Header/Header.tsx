'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import VideoChannelCreateHeader from './VideoChannelCreateHeader';
import VideoChannelHeader from './VideoChannelHeader';

export type HeaderProps = {
  back: () => void;
  next: () => void;
};

const Header = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [path, setPath] = useState<string>('');
  const back = () => {
    router.back();
  };

  useEffect(() => {
    setPath(pathname.replace(`/${params.workspaceId}/video-channel`, ''));
  }, [pathname]);

  switch (path) {
    case '/create':
      return <VideoChannelCreateHeader back={back} next={() => router.push('/video-channel/create')} />;
    default:
      return <VideoChannelHeader back={back} next={() => router.push('/video-channel/create')} />;
  }
};

export default Header;
