import { AuthStoreProvider } from '@/providers/AuthStoreProvider';
import QueryProvider from '@/providers/QueryProvider';
import { SnackBarContextProvider } from '@/providers/SnackBarContext';
import SupabaseProvider from '@/providers/SupabaseProvider';
import type { StrictPropsWithChildren } from '@/types/common';
import { createClient } from '@/utils/supabase/supabaseServer';

const ProvidersLayout = ({ children }: StrictPropsWithChildren) => {
  const supabase = createClient();

  return (
    <QueryProvider>
      <SupabaseProvider>
        <AuthStoreProvider>
          <SnackBarContextProvider>{children}</SnackBarContextProvider>
        </AuthStoreProvider>
      </SupabaseProvider>
    </QueryProvider>
  );
};

export default ProvidersLayout;
