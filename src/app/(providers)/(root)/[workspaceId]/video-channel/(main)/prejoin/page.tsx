import '@livekit/components-styles';
import { Suspense } from 'react';
import PrejoinContent from './_components/PrejoinContent';

const PreJoinPage = async () => {
  return (
    <Suspense>
      <PrejoinContent />
    </Suspense>
  );
};

export default PreJoinPage;
