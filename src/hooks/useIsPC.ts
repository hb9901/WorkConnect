'use client';

import { useEffect, useState } from 'react';

const useIsPC = () => {
  const [isPC, setIsPC] = useState<boolean | null>(null);

  useEffect(() => {
    setIsPC(window.innerWidth >= 1024);
  }, []);

  return !!isPC;
};

export default useIsPC;
