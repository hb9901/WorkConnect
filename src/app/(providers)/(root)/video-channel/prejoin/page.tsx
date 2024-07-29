'use client';

import { setLogLevel } from '@livekit/components-react';
import '@livekit/components-styles';
import { Suspense } from 'react';
import PrejoinContent from './_components/PrejoinContent';

const PreJoinPage = () => {
  setLogLevel('debug', { liveKitClientLogLevel: 'warn' });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PrejoinContent />
    </Suspense>
  );
};

export default PreJoinPage;
