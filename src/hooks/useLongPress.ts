'use client';

import { useCallback, useRef } from 'react';

const useLongPress = (onLongPress: (event: React.TouchEvent) => void, delay = 500) => {
  const ref = useRef<boolean>(false);
  let timeoutId: NodeJS.Timeout | null = null;

  const onTouchStart = useCallback(
    (event: React.TouchEvent) => {
      if (ref.current) return;
      ref.current = true;

      timeoutId = setTimeout(() => {
        onLongPress(event);
        ref.current = false;
      }, delay);
    },
    [onLongPress, delay]
  );

  const onTouchEnd = useCallback(() => {
    if (!timeoutId) return;

    clearTimeout(timeoutId);
    ref.current = false;
  }, []);

  return {
    onTouchStart,
    onTouchEnd
  };
};

export default useLongPress;
