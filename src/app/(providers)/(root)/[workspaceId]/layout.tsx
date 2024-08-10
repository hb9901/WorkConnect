'use client';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

interface ParallelLayoutProps {
  profile: React.ReactNode;
}

const ParallelLayout = ({ children, profile }: PropsWithChildren<ParallelLayoutProps>) => {
  const paths = usePathname().split('/');

  if (paths.length <= 2 || paths[2] !== 'profile')
    return (
      <>
        <div className="">{children}</div>
      </>
    );

  return (
    <>
      <div className="flex lg:flex-row">
        <div className="hidden lg:flex">{children}</div>
        <div className="w-full lg:min-w-[374px]">{profile}</div>
      </div>
    </>
  );
};

export default ParallelLayout;
