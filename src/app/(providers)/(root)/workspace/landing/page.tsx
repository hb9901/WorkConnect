'use client';
import useShallowSelector from '@/app/hooks/useShallowSelector';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { AuthStoreTypes } from '@/store/authStore';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type UserType = {
  user: AuthStoreTypes['user'];
};

const InviteCodePage = () => {
  const [inviteCode, setInviteCode] = useState<string | ''>('');
  const route = useRouter();

  const { user } = useShallowSelector<AuthStoreTypes, UserType>(useAuthStore, ({ user }) => ({ user }));
  console.log(user);

  const handleSubmit = useMutation({
    mutationFn: async () => {
      if (!user) return alert('로그인이 필요합니다.');
      if (!inviteCode) return alert('초대 코드를 입력해주세요.');

      const { data: workspaceData, error: workspaceError } = await supabase
        .from('workspace')
        .select('id')
        .eq('invite_code', Number(inviteCode))
        .single();

      if (workspaceData) {
        console.log(workspaceData.id);
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

      if (workspaceUserError) {
        console.log(workspaceUserError);
        alert('존재하지 않는 초대코드 입니다.');
        return;
      }

      // TODO : 초대코드 입력 성공 시 메인페이지 이동처리하기
      setInviteCode('');
      alert('초대코드 입력이 완료되었습니다.');
    }
  });

  const { mutate: handleSubmitMutate } = handleSubmit;

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
              type="text"
              placeholder="초대 코드를 입력해주세요"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              maxLength={6}
            />
          </div>
        </div>
        <div className="flex justify-center mt-4 mb-[167px]">
          <button
            onClick={() => handleSubmitMutate()}
            className="w-full text-lg py-[12px] px-[22px] bg-[#333] text-white rounded-lg shadow-md"
          >
            {handleSubmit.isPending ? '초대코드 확인 중...' : '확인'}
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
