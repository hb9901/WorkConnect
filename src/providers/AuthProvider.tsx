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

  useEffect(() => {
    const {
      data: { subscription: authListner }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        clearStore();
        router.refresh();
      }
    });

    return () => {
      authListner.unsubscribe();
    };
  }, [accessToken, supabase, router]);

  return children;
}
