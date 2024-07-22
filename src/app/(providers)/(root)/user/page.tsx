import { createClient } from "@/utils/supabase/supabaseServer";
import SignOutButton from "../auth/_components/SignOutButton";

const UserPage = async () => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("session : ", session?.user);

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-2">
      {session ? (
        <>
          <p className="text-2xl font-bold">
            {session?.user?.email}님! 안녕하세요!
          </p>
          <SignOutButton />
        </>
      ) : (
        <button
          className="bg-cyan-500 text-white px-4 py-2 rounded-md"
          type="button"
        >
          로그인
        </button>
      )}
    </main>
  );
};

export default UserPage;
