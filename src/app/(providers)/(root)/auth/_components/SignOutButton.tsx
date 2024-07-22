"use client";

import { createClient } from "@/utils/supabase/supabaseClient";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const supabase = createClient();
  const route = useRouter();

  const signOut = async () => {
    const isLogout = confirm("로그아웃 하시겠습니까?");
    if (!isLogout) return;

    await supabase.auth.signOut();
    route.push("/");
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-md"
      type="button"
      onClick={signOut}
    >
      로그아웃
    </button>
  );
};

export default SignOutButton;
