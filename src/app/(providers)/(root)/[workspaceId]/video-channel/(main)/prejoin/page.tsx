import { setLogLevel } from '@livekit/components-react';
import '@livekit/components-styles';
import { Suspense } from 'react';
import Loading from '../_components/Loading';
import PrejoinContent from './_components/PrejoinContent';

const PreJoinPage = () => {
  setLogLevel('debug', { liveKitClientLogLevel: 'warn' });

  return (
    <Suspense fallback={<Loading />}>
      <PrejoinContent />
    </Suspense>
  );
};

export default PreJoinPage;
