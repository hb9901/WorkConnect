'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import VideoChannelCreateHeader from './VideoChannelCreateHeader';

export type HeaderProps = {
  back: () => void;
  next: () => void;
};

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [path, setPath] = useState<string>('');
  const back = () => {
    router.back();
  };

  switch (pathname) {
    case '/':
      return (
        <div>
          <VideoChannelCreateHeader back={back} next={() => router.push('/video-channel/create')} />
        </div>
      );

    default:
      return <div>헤더</div>;
  }
};

export default Header;
