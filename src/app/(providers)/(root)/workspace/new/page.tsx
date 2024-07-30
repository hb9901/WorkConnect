'use client';
import useShallowSelector from '@/hooks/useShallowSelector';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { AuthStoreTypes } from '@/store/authStore';
import useUserStore from '@/store/userStore';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BackButton from '../../auth/_components/BackButton';

const getRandomNumbers = (count: number, min: number, max: number) => {
  const range = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  const shuffled = range.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

type UserType = {
  user: AuthStoreTypes['user'];
};

const NewWorkSpacePage = () => {
  const route = useRouter();
  const [orgName, setOrgName] = useState<string | ''>('');
  const [workUserData, setWorkUserData] = useState<{ id: string } | null>(null);
  const setUserData = useUserStore((state) => state.setUserData);
  const { user } = useShallowSelector<AuthStoreTypes, UserType>(useAuthStore, ({ user }) => ({ user }));

  // TODO : 리팩터링 예정
  const handleJoin = useMutation({
    mutationFn: async () => {
      if (!user) {
        alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        route.push('/landing');
        return;
      }
      if (!orgName) return alert('조직 이름을 입력해주세요!');

      if (!workUserData) {
        alert('워크스페이스에 유저 데이터가 없습니다.');
        return;
      }

      const randomNumbers = getRandomNumbers(6, 1, 9);
      const combinedNumber = Number(randomNumbers.join(''));

      const { error } = await supabase.from('workspace').insert({
        name: orgName,
        invite_code: combinedNumber,
        admin_user_id: workUserData.id
      });

      if (error) {
        alert(`워크스페이스를 생성하는 중 오류가 발생했습니다. ${error.message}`);
        return;
      }

      const { data: workspaceData, error: workspaceError } = await supabase
        .from('workspace')
        .select('id')
        .eq('admin_user_id', workUserData.id)
        .single();

      if (workspaceError) {
        alert(`워크스페이스 생성 중 오류가 발생했습니다. ${workspaceError.message}`);
        return;
      }

      if (!workspaceData) {
        alert('워크스페이스 생성 중 오류가 발생했습니다.');
        return;
      }

      const { error: workspaceUserError } = await supabase
        .from('workspace_user')
        .update({ workspace_id: workspaceData.id })
        .eq('user_id', user.id);

      if (workspaceUserError) {
        alert(`워크스페이스 유저 업데이트 중 오류가 발생했습니다. ${workspaceUserError.message}`);
        return;
      }

      setUserData(user.id, workspaceData.id);

      // TODO : 완료 후 페이지 이동처리하기
      alert('워크스페이스 생성 완료!');
      setOrgName('');
      route.push('/home');
    }
  });

  const { mutate: handleJoinMutate } = handleJoin;

  useEffect(() => {
    const getWorkspaceUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        route.push('/landing');
        return;
      }

      const { data: workspaceUserData, error: workspaceUserError } = await supabase
        .from('workspace_user')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (workspaceUserError) {
        console.log(`워크스페이스 유저를 가져오는 중 오류가 발생했습니다. : ${workspaceUserError}`);
        return;
      }

      if (!workspaceUserData) {
        console.log('해당 유저는 워크스페이스에 속해있지 않습니다.');
        return;
      }

      setWorkUserData({ id: workspaceUserData.id });
    };

    getWorkspaceUser();
  }, []);

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
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              maxLength={20}
              required={true}
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handleJoinMutate()}
            className="w-full text-lg py-[12px] px-[22px] bg-[#333] text-white rounded-lg shadow-md"
            type="button"
          >
            {handleJoin.isPending ? '가입중입니다...' : '가입하기'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default NewWorkSpacePage;
