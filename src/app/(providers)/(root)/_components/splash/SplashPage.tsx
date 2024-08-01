'use client';
import WorkConnectLogoIcon from '@/icons/WorkConnectLogo.svg';
import WorkConnectLogoTextIcon from '@/icons/WorkConnectLogoText.svg';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const SplashPage = () => {
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const [isSplashSeen, setIsSplashSeen] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/' && hidden) return;
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setHidden(true), 500);
    }, 2500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <main
      className={`fixed inset-0 z-50 flex justify-center bg-white ${fadeOut ? 'opacity-0 transition-opacity duration-500' : ''} ${hidden ? 'hidden' : ''}`}
    >
      <div className="flex flex-col justify-center items-center w-[375px] h-dvh">
        <div className="flex flex-col items-center justify-center">
          <WorkConnectLogoIcon className="w-[105px] h-[55px]" />
          <div className="flex flex-col justify-center items-center text-[#A1A3FC] mt-7">
            <WorkConnectLogoTextIcon />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SplashPage;
