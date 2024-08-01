import AuthProvider from '@/providers/AuthProvider';
import { AuthStoreProvider } from '@/providers/AuthStoreProvider';
import QueryProvider from '@/providers/QueryProvider';
import { SnackBarContextProvider } from '@/providers/SnackBarContext';
import SupabaseProvider from '@/providers/SupabaseProvider';
import type { StrictPropsWithChildren } from '@/types/common';
import { createClient } from '@/utils/supabase/supabaseServer';

const ProvidersLayout = async ({ children }: StrictPropsWithChildren) => {
  const supabase = createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();
  const accessToken = session?.access_token;

  return (
    <QueryProvider>
      <SupabaseProvider>
        <AuthProvider accessToken={accessToken || ''}>
          <AuthStoreProvider>
            <SnackBarContextProvider>{children}</SnackBarContextProvider>
          </AuthStoreProvider>
        </AuthProvider>
      </SupabaseProvider>
    </QueryProvider>
  );
};

export default ProvidersLayout;
