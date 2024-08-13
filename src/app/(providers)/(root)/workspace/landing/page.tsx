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
import { getWorkspaceIdCookie, setWorkspaceIdCookie, setWorkspaceUserIdCookie } from '@/utils/cookie/workspace';
import WorkConnectLogoIcon from '@/icons/WorkConnectLogo.svg';
import Typography from '@/components/Typography';
import Input from '@/components/Input';
import Button from '@/components/Button';

type UserType = {
  user: AuthStoreTypes['user'];
};

const InviteCodePage = () => {
  const [inviteCode, setInviteCode] = useState<string | ''>('');
  const setUserData = useUserStore((state) => state.setUserData);
  const route = useRouter();
  const { user } = useShallowSelector<AuthStoreTypes, UserType>(useAuthStore, ({ user }) => ({ user }));
  const { openSnackBar } = useSnackBar();
  const cookieWorkspaceId = getWorkspaceIdCookie();

  // TODO : 리팩터링 예정
  const handleSubmit = useMutation({
    mutationFn: async () => {
      if (!user) {
        openSnackBar({ message: '로그인이 필요해요' });
        route.push('/');
        return;
      }

      //? 로그인 상태일 때, 초대코드 입력 시 워크스페이스 입장
      if (cookieWorkspaceId) {
        console.log('쿠키에 저장된 workspaceId:', cookieWorkspaceId);
        console.log('로그인 돼있다~~~~~~~~~~');
        //? 초대코드랑 같은 workspace_id를 가져옴
        const { data: workspaceData, error: workspaceError } = await supabase
          .from('workspace')
          .select('id')
          .eq('invite_code', Number(inviteCode))
          .single();

        if (workspaceError) return openSnackBar({ message: '존재하지 않는 초대코드에요' });

        //? 초대코드랑 같은 workspace_id를 가져온 유저를 workspace_user 테이블에 추가
        const { data: existingWorkspaceUser, error: existingWorkspaceUserError } = await supabase
          .from('workspace_user')
          .select('id')
          .eq('workspace_id', workspaceData.id)
          .eq('user_id', user.id)
          .single();

        console.log('existingWorkspaceUser:', existingWorkspaceUser);

        if (existingWorkspaceUser) {
          openSnackBar({ message: '이미 워크스페이스에 가입되어 있습니다.' });
          return;
        }

        //? 초대코드랑 같은 workspace_id를 가져온 유저를 workspace_user 테이블에 추가
        const { error: workspaceUserError } = await supabase
          .from('workspace_user')
          .insert({
            workspace_id: workspaceData.id,
            user_id: user.id,
            name: user.user_metadata.name,
            email: user.user_metadata.email
          })
          .select();

        if (workspaceUserError) {
          openSnackBar({ message: '에러가 발생했어요' });
          return;
        }

        setWorkspaceIdCookie(workspaceData.id);
        setWorkspaceUserIdCookie(user.id);
        setUserData(user.id, workspaceData.id);

        // TODO : 초대코드 입력 성공 시 메인페이지 이동처리하기
        setInviteCode('');
        return route.replace(`/${workspaceData.id}`);
      }

      //? 로그인 안했을때, 초대코드 입력 시 워크스페이스 입장
      if (!inviteCode) return openSnackBar({ message: '초대 코드를 입력해주세요' });

      const { data: workspaceData, error: workspaceError } = await supabase
        .from('workspace')
        .select('id')
        .eq('invite_code', Number(inviteCode))
        .single();

      if (workspaceError) return openSnackBar({ message: '초대코드가 일치하지 않습니다' });

      const { error: workspaceUserError } = await supabase
        .from('workspace_user')
        .update({ workspace_id: workspaceData.id })
        .eq('user_id', user.id)
        .select();

      if (workspaceUserError) {
        openSnackBar({ message: '에러가 발생했어요' });
        return;
      }

      setWorkspaceIdCookie(workspaceData.id);
      setWorkspaceUserIdCookie(user.id);
      setUserData(user.id, workspaceData.id);

      // TODO : 초대코드 입력 성공 시 메인페이지 이동처리하기
      setInviteCode('');
      route.replace('/welcome');
    }
  });

  const { mutate: handleSubmitMutate } = handleSubmit;

  // useEffect(() => {
  //   const getSession = async () => {
  //     if (cookieWorkspaceId) {
  //       return;
  //     }
  //     const {
  //       data: { session }
  //     } = await supabase.auth.getSession();

  //     if (session?.user.app_metadata.provider !== 'kakao') return;

  //     //? 최근 생성한 워크스페이스 조회
  //     const { data: workspaceUser, error: workspaceUserError } = await supabase
  //       .from('workspace_user')
  //       .select('workspace_id')
  //       .eq('user_id', session.user.id)
  //       .order('created_at', { ascending: false })
  //       .limit(1)
  //       .single();

  //     if (workspaceUserError) {
  //       openSnackBar({ message: '유저 조회 에러' });
  //       return;
  //     }

  //     if (workspaceUser.workspace_id !== null) {
  //       setWorkspaceIdCookie(workspaceUser.workspace_id);
  //       setWorkspaceUserIdCookie(session.user.id);
  //       setUserData(session.user.id, workspaceUser.workspace_id);
  //       return route.replace(`/${workspaceUser.workspace_id}`); // TODO: 홈 화면이동 처리
  //     }
  //     return;
  //   };

  //   getSession();
  // }, []);

  return (
    <main className="flex justify-center items-center w-full h-dvh">
      <div className="flex flex-col w-[375px] lg:w-[590px] h-dvh px-4">
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
              전달 받은 초대 코드를 입력해주세요
            </Typography>
          </div>
          <div className="lg:px-[55px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <Input
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="초대 코드를 입력해주세요"
                />
              </div>
            </div>
            <div className="flex justify-center mt-4 mb-[167px]">
              <Button
                theme="primary"
                onClick={() => handleSubmitMutate()}
                isDisabled={handleSubmit.isPending}
                isFullWidth={true}
              >
                {handleSubmit.isPending ? '초대코드 확인 중...' : '확인'}
              </Button>
            </div>
          </div>

          <div className="flex justify-center items-center py-3 px-[6px] gap-[10px]">
            <button>
              <Typography variant="Body14px" color="grey700Black">
                도움말
              </Typography>
            </button>
            <span className="text-[12px]">|</span>
            <button onClick={() => route.push('/workspace/new')}>
              <Typography variant="Body14px" color="grey700Black">
                워크스페이스 만들기
              </Typography>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InviteCodePage;
