'use client';

import WorkConnectLogoIcon from '@/icons/WorkConnectLogo.svg';
import WorkConnectLogoTextIcon from '@/icons/WorkConnectLogoText.svg';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const SplashPage = () => {
  const [isFadeOut, setIsFadeOut] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const pathname = usePathname();
  const isSplashSeen = isHidden || pathname !== '/';

  useEffect(() => {
    if (isSplashSeen) return;

    const timer = setTimeout(() => {
      setIsFadeOut(true);
      setTimeout(() => setIsHidden(true), 500);
    }, 2500);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (isSplashSeen) return null;

  return (
    <main
      className={`fixed inset-0 z-50 flex justify-center bg-white ${isFadeOut ? 'opacity-0 transition-opacity duration-500' : ''} ${isHidden ? 'hidden' : ''}`}
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
