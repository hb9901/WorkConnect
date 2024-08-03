'use client';
import useUserStore from '@/store/userStore';
import { deleteAllCookies } from '@/utils/cookieUtils';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useRouter } from 'next/navigation';

// TODO : 테스트 (삭제예정)
const Logout = () => {
  const route = useRouter();
  const { clearStore } = useUserStore((state) => state);

  const logout = async () => {
    const logoutConfirm = confirm('로그아웃 하시겠습니까?');
    if (logoutConfirm) {
      await supabase.auth.signOut();
      clearStore();
      deleteAllCookies();
      route.push('/');
    }
  };
  return (
    <button className="bg-red-500 text-white px-4 py-2 rounded-md" type="button" onClick={logout}>
      로그아웃
    </button>
  );
};

export default Logout;
