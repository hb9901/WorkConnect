'use client';
import BackButton from '../../auth/_components/BackButton';
import useShallowSelector from '@/app/hooks/useShallowSelector';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { AuthStoreTypes } from '@/store/authStore';
import useUserStore from '@/store/userStore';
import { supabase } from '@/utils/supabase/supabaseClient';
import { User, UserMetadata } from '@supabase/supabase-js';
import { useState } from 'react';

type UserType = {
  fullName: UserMetadata['full_name'];
  thumbnail: UserMetadata['avatar_url'];
  email: User['email'];
  logout: AuthStoreTypes['logout'];
  user: AuthStoreTypes['user'];
};

const NewWorkSpacePage = () => {
  const [orgName, setOrgName] = useState('');

  const { thumbnail, fullName, email, logout, user } = useShallowSelector<AuthStoreTypes, UserType>(
    useAuthStore,
    ({ user, logout }) => ({
      thumbnail: user?.user_metadata?.avatar_url || null,
      fullName: user?.user_metadata?.full_name || null,
      email: user?.email,
      logout,
      user
    })
  );
  console.log('user.id : ', user?.id);

  const handleJoin = async () => {
    if (!user) return alert('로그인이 필요합니다.');

    try {
      const { data, error } = await supabase.from('workspace').insert({
        name: orgName,
        invite_code: 123456,
        admin_user_id: user.id
      });

      if (!error) {
        alert('가입완료!');
        return;
      }

      if (error) {
        alert(`워크스페이스를 생성하는 중 오류가 발생했습니다. ${error.message}`);
      }
    } catch (error) {
      alert(`워크스페이스를 생성하는 중 오류가 발생했습니다. ${error}`);
    }
  };

  // console.log('thumbnail: ', thumbnail);
  // console.log('fullName: ', fullName);
  // console.log('email: ', email);
  // console.log('logout: ', logout);
  // console.log('user: ', user?.id);
  // console.log('user: ', user);

  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-dvh px-4">
        <div className="flex w-[375px] h-[52px] pt-[14px] pb-[12px] items-center relative">
          <BackButton className="absolute left-0" />
          <strong className="text-[20px] text-[#2E2E2E] font-semibold text-center flex-1">
            새 워크스페이스 만들기
          </strong>
        </div>
        <strong className="text-[20px] text-[#2E2E2E] font-semibold pt-[42px] pb-[28px] flex items-center">
          계정 정보 입력
        </strong>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col">
            <label className="text-[14px] text-[#333] opacity-60 pl-[6px] pb-2" htmlFor="email">
              조직이름
            </label>
            <input
              className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
              type="text"
              placeholder="회사, 단체, 조직 이름 입력."
              onChange={(e) => setOrgName(e.target.value)}
              required={true}
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleJoin}
            className="w-full text-lg py-[12px] px-[22px] bg-[#333] text-white rounded-lg shadow-md"
            type="button"
          >
            가입하기
          </button>
        </div>
      </div>
    </main>
  );
};

export default NewWorkSpacePage;
