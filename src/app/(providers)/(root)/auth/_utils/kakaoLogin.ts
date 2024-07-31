import { supabase } from '@/utils/supabase/supabaseClient';

export const signInWithKakao = async () => {
  const { error: kakaoError } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/signup/kakao`
        : 'http://localhost:3100/api/signup/kakao'
    }
  });
  if (kakaoError) throw new Error(kakaoError.message);
};
