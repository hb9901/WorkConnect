'use client';

import useShallowSelector from '@/hooks/useShallowSelector';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { AuthStoreTypes } from '@/store/authStore';
import useUserStore from '@/store/userStore';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSnackBar } from '@/providers/SnackBarContext';
import {
  getUserIdCookie,
  getWorkspaceUserIdCookie,
  setUserIdCookie,
  setWorkspaceIdCookie,
  setWorkspaceUserIdCookie
} from '@/utils/cookie/workspace';
import { TopBar } from '@/components/TopBar';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Typography from '@/components/Typography';
import WorkConnectLogoIcon from '@/icons/WorkConnectLogo.svg';

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
  const { openSnackBar } = useSnackBar();

  // TODO : 리팩터링 예정
  const handleJoin = useMutation({
    mutationFn: async () => {
      const cookieUserId = getUserIdCookie();
      const randomNumbers = getRandomNumbers(6, 1, 9);
      const combinedNumber = Number(randomNumbers.join(''));

      if (!user) {
        openSnackBar({ message: '로그인이 필요해요' });
        route.replace('/');
        return;
      }
      if (!orgName) return openSnackBar({ message: '조직 이름을 입력해주세요!' });

      if (!workUserData) {
        openSnackBar({ message: '워크스페이스에 유저 데이터가 없어요' });
        return;
      }

      //? 로그인 상태일 때, 워크스페이스 생성
      if (cookieUserId) {
        //? 새 워크스페이스 생성
        const { error } = await supabase.from('workspace').insert({
          name: orgName,
          invite_code: combinedNumber,
          admin_user_id: workUserData.id
        });

        if (error) {
          openSnackBar({ message: '오류가 발생했어요' });
          console.log(error);
          return;
        }

        //? 워크스페이스 생성 완료 후, workspace_id 가져옴
        const { data: workspaceData, error: workspaceError } = await supabase
          .from('workspace')
          .select('id')
          .eq('admin_user_id', workUserData.id)
          .single();

        if (workspaceError) {
          openSnackBar({ message: '오류가 발생했어요?' });
          return;
        }

        //? 워크스페이스 생성 완료 후, workspace_user 테이블에 workspace_id 추가
        const { error: workspaceUserError } = await supabase.from('workspace_user').insert({
          workspace_id: workspaceData.id,
          user_id: cookieUserId,
          name: user.user_metadata.name,
          email: user.user_metadata.email
        });

        if (workspaceUserError) {
          openSnackBar({ message: '오류가 발생했어요' });
          return;
        }

        setWorkspaceIdCookie(workspaceData.id);
        setUserIdCookie(cookieUserId);
        setUserData(user.id, workspaceData.id);

        // TODO : 생성 완료 후 페이지 이동처리하기
        setOrgName('');
        return route.replace(`/${workspaceData.id}`);
      }

      //? 로그인 안했을때 (회원가입 후 워크스페이스 생성)
      const { error } = await supabase.from('workspace').insert({
        name: orgName,
        invite_code: combinedNumber,
        admin_user_id: workUserData.id
      });

      if (error) {
        openSnackBar({ message: '오류가 발생했어요' });
        return;
      }

      const { data: workspaceData, error: workspaceError } = await supabase
        .from('workspace')
        .select('id')
        .eq('admin_user_id', workUserData.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (workspaceError) {
        openSnackBar({ message: `워크스페이스 생성 중 오류가 발생했습니다. ${workspaceError.message}` });
        return;
      }

      if (!workspaceData) {
        openSnackBar({ message: '워크스페이스 생성 중 오류가 발생했어요' });
        return;
      }

      const { error: workspaceUserError } = await supabase
        .from('workspace_user')
        .update({ workspace_id: workspaceData.id })
        .eq('user_id', user.id);

      if (workspaceUserError) {
        openSnackBar({ message: '오류가 발생했어요' });
        return;
      }

      setWorkspaceIdCookie(workspaceData.id);
      setUserIdCookie(user.id);
      setUserData(user.id, workspaceData.id);

      // TODO : 생성 완료 후 페이지 이동처리하기
      setOrgName('');
      return route.replace('/welcome');
    }
  });

  const { mutate: handleJoinMutate } = handleJoin;

  useEffect(() => {
    const getWorkspaceUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        openSnackBar({ message: '로그인이 필요합니다' });
        return;
      }

      //? limit(1)해도 오류
      const { data: workspaceUserData, error: workspaceUserError } = await supabase
        .from('workspace_user')
        .select('id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      //? 지금 여기서 오류남 이유는 아직 모름
      //? 로그인하고 new 페이지 오면 돌아가짐
      if (workspaceUserError) {
        console.log(workspaceUserError);
        openSnackBar({ message: '오류가 발생했어요' });
        route.replace('/');
        return;
      }

      if (!workspaceUserData) {
        openSnackBar({ message: '해당 유저는 워크스페이스에 속해있지 않아요' });
        route.replace('/');
        return;
      }

      setWorkUserData({ id: workspaceUserData.id });
    };

    getWorkspaceUser();
  }, []);

  return (
    <main className="flex justify-center items-center w-full h-dvh">
      <div className="flex flex-col w-[375px] lg:w-[590px] h-dvh px-4">
        <TopBar title="워크스페이스 만들기" className="px-0 lg:hidden" style={{ padding: '0px' }} />
        <div className="flex flex-col items-center mt-[109px]">
          <div className="w-[105px] h-[55px] lg:w-[95px] lg:h-[50px] lg:mb-9">
            <WorkConnectLogoIcon className="w-full h-full" />
          </div>
        </div>

        <div className="lg:border lg:px-[42px] lg:py-[72px] lg:rounded-lg">
          <div className="mt-8 mb-7 flex flex-col items-center gap-3">
            <Typography variant="Title20px" className="lg:text-[36px]" color="grey700Black">
              협업의 새로운 연결, 워크커넥트
            </Typography>
            <Typography variant="Subtitle14px" className="lg:text-[18px]" color="grey500">
              새 워크스페이스를 만들려면 계정 정보가 필요해요
            </Typography>
          </div>
          <div className="lg:px-[55px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <Typography variant="Body14px" color="grey700Black" className="mb-2">
                  조직 이름
                </Typography>
                <Input
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="회사, 단체, 조직 이름을 입력해주세요"
                />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Button
                theme="primary"
                onClick={() => handleJoinMutate()}
                isDisabled={handleJoin.isPending}
                isFullWidth={true}
              >
                <Typography variant="Subtitle18px" className="text-white">
                  {handleJoin.isPending ? '초대코드 확인 중...' : '가입하기'}
                </Typography>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewWorkSpacePage;
