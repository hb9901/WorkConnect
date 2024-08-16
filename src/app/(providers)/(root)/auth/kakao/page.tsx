'use client';

import useSetGlobalUser from '@/hooks/useSetGlobalUser';
import useShallowSelector from '@/hooks/useShallowSelector';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { AuthStoreTypes } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { useGetWorkspaceId } from '../../workspace/landing/_hooks/useInvite';
import { useGetUserSessionMutation } from '../../_hook/useLogin';

const KakaoAuthPage = () => {
  const { handleSetGlobalUser } = useSetGlobalUser();
  const router = useRouter();

  const handleRedirectHome = () => {
    console.log('handleRedirectHome 실행');
    router.replace('/');
    return;
  };

  const { mutateAsync: getWorkspaceIdMutation, isPending: getWorkspaceIdPending } = useGetWorkspaceId({
    onError: handleRedirectHome
  });

  const { mutateAsync: getUserSessionMutation, isPending: getUserSessionPending } = useGetUserSessionMutation({
    onError: handleRedirectHome
  });

  useLayoutEffect(() => {
    const getSession = async () => {
      const userSession = await getUserSessionMutation();
      const userSessionId = userSession?.id;

      if (!userSessionId) {
        handleRedirectHome();
        return;
      }

      const { workspaceId, workspaceUserId } = await getWorkspaceIdMutation({ userId: String(userSessionId) });

      if (workspaceId === null) {
        router.replace('/workspace/landing');
        return;
      }

      handleSetGlobalUser({ userId: String(userSessionId), workspaceId, workspaceUserId });
      router.replace(`/${workspaceId}`);
    };

    getSession();
  }, []);

  return null;
};

export default KakaoAuthPage;
