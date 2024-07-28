'use client';
import workspaceUserAPI from '@/api/workspaceUserAPI';
import useShallowSelector from '@/app/hooks/useShallowSelector';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { AuthStoreTypes } from '@/store/authStore';
import useUserStore from '@/store/userStore';
import { supabase } from '@/utils/supabase/supabaseClient';
import { User, UserMetadata } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type UserType = {
  fullName: UserMetadata['full_name'];
  thumbnail: UserMetadata['avatar_url'];
  email: User['email'];
  logout: AuthStoreTypes['logout'];
  user: AuthStoreTypes['user'];
};

const InviteCodePage = () => {
  const [inviteCode, setInviteCode] = useState<number>();
  const route = useRouter();

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
  console.log(user);

  const handleSubmit = async () => {
    if (!user) return alert('로그인이 필요합니다.');

    const { data: workspaceData, error: workspaceError } = await supabase
      .from('workspace')
      .select('id')
      .eq('invite_code', Number(inviteCode))
      .single();

    if (workspaceData) {
      console.log(workspaceData.id); // workspace > id
    }
    if (workspaceError) {
      console.log(`워크스페이스 조회 에러: ${workspaceError.message}`);
      alert('존재하지 않는 초대코드 입니다.');
      return;
    }

    const { data: workspaceUserData, error: workspaceUserError } = await supabase
      .from('workspace_user')
      .update({ workspace_id: workspaceData.id })
      .eq('user_id', user.id);

    console.log('workspaceUserData', workspaceUserData);

    if (workspaceUserData) {
      console.log('workspaceUserData', workspaceUserData);
      alert('초대코드 입력이 완료되었습니다.');
      return;
    }

    if (workspaceUserError) {
      console.log(workspaceUserError);
      alert('존재하지 않는 초대코드 입니다.');
      return;
    }
  };

  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-dvh px-4">
        <div className="flex flex-col items-center mt-[109px] mb-[38px] gap-[12px]">
          <div className="w-[166px] h-[166px] bg-black"></div>
          <strong className="text-[20px] text-[#2E2E2E]">슬로건, 프로덕트명</strong>
          <p className="text-[14px] text-[rgb(46,46,46)] opacity-60 pl-[6px] pb-2">
            전달 받은 초대 코드를 입력해주세요
          </p>
        </div>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col">
            <input
              className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
              type="email"
              id="email"
              placeholder="초대 코드를 입력해주세요"
              onChange={(e) => setInviteCode(Number(e.target.value))}
              maxLength={6}
              required={true}
            />
          </div>
        </div>
        <div className="flex justify-center mt-4 mb-[167px]">
          <button
            onClick={handleSubmit}
            className="w-full text-lg py-[12px] px-[22px] bg-[#333] text-white rounded-lg shadow-md"
          >
            확인
          </button>
        </div>
        <div className="flex justify-center items-center py-2 px-4 gap-[10px]">
          <button className="text-[#333] text-center text-[14px] font-normal">도움말</button>
          <span className="text-[12px]">|</span>
          <button
            onClick={() => route.push('/workspace/new')}
            className="text-[#333] text-center text-[14px] font-normal"
          >
            워크스페이스 만들기
          </button>
        </div>
      </div>
    </main>
  );
};

export default InviteCodePage;
