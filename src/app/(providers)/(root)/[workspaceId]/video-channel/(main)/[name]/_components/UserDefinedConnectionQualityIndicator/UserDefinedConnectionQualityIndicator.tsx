import { useConnectionQualityIndicator } from '@livekit/components-react';
import { ConnectionQuality } from 'livekit-client';
import React, { useCallback } from 'react';

const UserDefinedConnectionQualityIndicator = React.memo(() => {
  const { quality } = useConnectionQualityIndicator();

  const qualityToCircle = useCallback((quality: ConnectionQuality) => {
    switch (quality) {
      case ConnectionQuality.Poor:
        return <div className="rounded-full bg-caution/[0.5] w-[6px] h-[6px]" />;
      case ConnectionQuality.Good:
        return <div className="rounded-full bg-information/[0.5] w-[6px] h-[6px]" />;
      case ConnectionQuality.Excellent:
        return <div className="rounded-full bg-success/[0.5] w-[6px] h-[6px]" />;
      case ConnectionQuality.Lost:
        return <div className="rounded-full bg-error/[0.5] w-[6px] h-[6px]" />;
      default:
        return null;
    }
  }, []);

  return qualityToCircle(quality);
});

export default UserDefinedConnectionQualityIndicator;
