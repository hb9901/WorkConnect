'use client';

import { setLogLevel } from '@livekit/components-react';
import '@livekit/components-styles';
import { Suspense } from 'react';
import PreJoinContent from '../_components/PrejoinContent/PreJoinContent';

const PreJoinPage = () => {
  setLogLevel('debug', { liveKitClientLogLevel: 'warn' });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PreJoinContent />
    </Suspense>
  );
};

export default PreJoinPage;
