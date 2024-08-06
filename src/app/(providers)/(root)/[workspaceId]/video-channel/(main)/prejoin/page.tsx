'use client';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import useUserStore from '@/store/userStore';
import '@livekit/components-styles';
import { Suspense, useEffect, useState } from 'react';
import Loading from '../_components/Loading';
import PrejoinContent from './_components/PrejoinContent';

const PreJoinPage = () => {
  const { workspaceUserId } = useUserStore();
  const { workspaceUser } = useWorkspaceUser(workspaceUserId);
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('workspaceUserName') || '';
  });

  useEffect(() => {
    if (workspaceUser) {
      localStorage.setItem('workspaceUser', JSON.stringify(workspaceUser.name));
      setUsername(workspaceUser.name);
    }
  }, [workspaceUser]);

  return (
    <Suspense fallback={<Loading />}>
      <PrejoinContent username={username} />
    </Suspense>
  );
};

export default PreJoinPage;
