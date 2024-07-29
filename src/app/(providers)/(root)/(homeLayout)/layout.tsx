'use client';
import { StrictPropsWithChildren } from '@/types/common';
import { useEffect } from 'react';

const HomeLayout = ({ children }: StrictPropsWithChildren) => {
  useEffect(() => {});
  return <>{children}</>;
};

export default HomeLayout;
