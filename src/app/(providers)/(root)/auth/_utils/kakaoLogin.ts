import { supabase } from "@/utils/supabase/supabaseClient";

export const signInWithKakao = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_API_URL
        ? `https://${process.env.NEXT_PUBLIC_API_URL}/api/signup/kakao`
        : "http://localhost:3000/api/signup/kakao",
    },
  });
  console.log("KAKAO_DATA : ", data);
};
