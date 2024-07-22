import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import type { StrictPropsWithChildren } from "@/types/common";
import { createClient } from "@/utils/supabase/supabaseServer";

const ProvidersLayout = async ({ children }: StrictPropsWithChildren) => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const accessToken = session?.access_token;

  console.log("accessToken : ", accessToken);

  return (
    <QueryProvider>
      <SupabaseProvider>
        <AuthProvider accessToken={accessToken || ""}>{children}</AuthProvider>
      </SupabaseProvider>
    </QueryProvider>
  );
};

export default ProvidersLayout;
