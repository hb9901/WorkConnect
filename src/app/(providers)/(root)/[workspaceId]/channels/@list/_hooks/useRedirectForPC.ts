'use client';

import useIsPC from '@/hooks/useIsPC';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useRedirectForPC = (channelId: number | null) => {
  const router = useRouter();
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
  const isPC = useIsPC();

  useEffect(() => {
    if (!channelId || !isPC || pathname !== `/${workspaceId}/channels`) return;

    router.replace(`/${workspaceId}/channels/${channelId}`);
  }, [channelId, isPC]);

  return null;
};

export default useRedirectForPC;
