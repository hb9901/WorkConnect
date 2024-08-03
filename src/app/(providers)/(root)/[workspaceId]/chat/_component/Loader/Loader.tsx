'use client';

import { WorkConnectLogoIcon } from '@/icons';
import clsx from 'clsx';

const Loader = ({ className }: { className: string }) => {
  return (
    <div
      className={clsx(
        'fixed top-0 left-0 w-full h-full z-10 pb-[10%] flex justify-center items-center bg-white pointer-events-none',
        className
      )}
    >
      <WorkConnectLogoIcon className="w-[65px]" />
    </div>
  );
};

export default Loader;
