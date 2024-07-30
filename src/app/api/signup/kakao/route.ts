import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/supabaseServer';

export async function GET(request: Request) {
  const supabase = createClient();

  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/workspace/landing';

  if (code) {
    const { data: session } = await supabase.auth.getSession();
    console.log('session ::: ', session);
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
