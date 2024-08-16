import { AuthStoreProvider } from '@/providers/AuthStoreProvider';
import BottomSheetModalBackDropProvider from '@/providers/BottomSheetModalBackDropProvider';
import QueryProvider from '@/providers/QueryProvider';
import { SnackBarContextProvider } from '@/providers/SnackBarContext';
import SupabaseProvider from '@/providers/SupabaseProvider';
import type { StrictPropsWithChildren } from '@/types/common';

const ProvidersLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <QueryProvider>
      <SupabaseProvider>
        <AuthStoreProvider>
          <SnackBarContextProvider>
            <BottomSheetModalBackDropProvider>{children}</BottomSheetModalBackDropProvider>
          </SnackBarContextProvider>
        </AuthStoreProvider>
      </SupabaseProvider>
    </QueryProvider>
  );
};

export default ProvidersLayout;
