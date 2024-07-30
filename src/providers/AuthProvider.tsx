'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/supabaseClient';
import useUserStore from '@/store/userStore';

type AuthProviderProps = {
  accessToken: string;
  children: React.ReactNode;
};

export default function AuthProvider({ accessToken, children }: AuthProviderProps) {
  const supabase = createClient();
  const router = useRouter();
  const clearStore = useUserStore((state) => state.clearStore);
  const { userId, workspaceId } = useUserStore((state) => state);

  useEffect(() => {
    const {
      data: { subscription: authListner }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        clearStore();
        router.refresh();
      }

      // if (!session) {
      //   return router.replace('/landing');
      // }

      // TODO : 세션이 있으면? 워크스페이스 가입 대상자 인지 먼저 확인 로직 작성
      // if (session) {
      //   console.log('userId', userId);
      //   console.log('workspaceId', workspaceId);
      // }
    });

    return () => {
      authListner.unsubscribe();
    };
  }, [accessToken, supabase, router]);

  return children;
}
