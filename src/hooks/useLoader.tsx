'use client';

import { useEffect, useState } from 'react';

type LoaderProps = { isPending: boolean; delay?: number };

const useLoader = ({ isPending, delay = 1000 }: LoaderProps) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (isPending) return;

    const timer = setTimeout(() => setShowLoader(false), delay);
    return () => clearTimeout(timer);
  }, [isPending]);

  return showLoader;
};

export default useLoader;
