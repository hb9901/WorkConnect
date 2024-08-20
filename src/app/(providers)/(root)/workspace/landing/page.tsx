'use client';

import { useState } from 'react';
import useShallowSelector from '@/hooks/useShallowSelector';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { AuthStoreTypes } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useSnackBar } from '@/providers/SnackBarContext';
import { getUserIdCookie } from '@/utils/cookie/workspace';
import WorkConnectLogoIcon from '@/icons/WorkConnectLogo.svg';
import Typography from '@/components/Typography';
import Input from '@/components/Input';
import Button from '@/components/Button';
import useSetGlobalUser from '@/hooks/useSetGlobalUser';
import {
  useExistingWorkspaceUser,
  useGetWorkspaceIdWithInviteCode,
  useInsertWorkspaceUser,
  useUpdateWorkspaceUser
} from './_hooks/useInvite';
import { INVITE_ERROR_CODE } from './constants';
import { useGetWorkspaceUserIdMutation } from '../../_hook/useLogin';
import { supabase } from '@/utils/supabase/supabaseClient';

type UserType = {
  user: AuthStoreTypes['user'];
};

const InviteCodePage = () => {
  const [inviteCode, setInviteCode] = useState<string | ''>('');
  const route = useRouter();
  const { user } = useShallowSelector<AuthStoreTypes, UserType>(useAuthStore, ({ user }) => ({ user }));
  const { openSnackBar } = useSnackBar();
  const cookieUserId = getUserIdCookie();
  const { handleSetGlobalUser } = useSetGlobalUser();

  const { mutateAsync: getWorkspaceIdWithInviteCodeMutation, isPending: getWorkspaceIdWithInviteCodePending } =
    useGetWorkspaceIdWithInviteCode({
      onError: (error: any) => {
        const notFoundInviteCodeForType = error.code === INVITE_ERROR_CODE.INVALID_TYPE;
        const notFoundInviteCodeForValue = error.code === INVITE_ERROR_CODE.INVALID_VALUE;

        if (notFoundInviteCodeForType || notFoundInviteCodeForValue) {
          openSnackBar({ message: '초대코드가 존재하지 않아요' });
          return;
        }
        openSnackBar({ message: `알 수 없는 에러가 발생했어요 (E-${error.code})` });
        return;
      }
    });

  const { mutateAsync: existingWorkspaceUserMutation, isPending: existingWorkspaceUserPending } =
    useExistingWorkspaceUser();

  const { mutateAsync: insertWorkspaceUserMutation, isPending: insertWorkspaceUserPending } = useInsertWorkspaceUser({
    onError: (error: any) => {
      openSnackBar({ message: `알 수 없는 에러가 발생했어요 (E-${error.code})` });
      return;
    }
  });

  const { mutateAsync: getWorkspaceUserIdMutation, isPending: getWorkspaceUserIdPending } =
    useGetWorkspaceUserIdMutation({
      onError: (error: any) => {
        openSnackBar({ message: `알 수 없는 에러가 발생했어요 (E-${error.code})` });
        return;
      }
    });

  const { mutateAsync: updateWorkspaceUserMutation, isPending: updateWorkspaceUserPending } = useUpdateWorkspaceUser({
    onError: (error: any) => {
      openSnackBar({ message: `알 수 없는 에러가 발생했어요 (E-${error.code})` });
      return;
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      openSnackBar({ message: '로그인이 필요해요' });
      route.replace('/');
      return;
    }

    if (!inviteCode) return openSnackBar({ message: '초대 코드를 입력해주세요' });
    // 초대코드랑 같은 workspace테이블의 id값을 가져옴, [ 234324 입력하면 -> 2(내배캠) 반환 ]
    const inviteWorkspaceId = await getWorkspaceIdWithInviteCodeMutation(inviteCode);
    const { id: workspaceId, notice_channel_id } = inviteWorkspaceId;

    //* 로그인 돼있을 시
    if (cookieUserId) {
      const existingWorkspaceUser = await existingWorkspaceUserMutation({
        workspaceId: workspaceId,
        userId: user.id
      });

      if (existingWorkspaceUser) {
        openSnackBar({ message: '이미 워크스페이스에 가입되어 있습니다.' });
        return;
      }

      const workspaceUserId = await insertWorkspaceUserMutation({
        workspaceId: workspaceId,
        userId: user.id,
        userName: user.user_metadata.name,
        userEmail: user.user_metadata.email
      });
      if (!workspaceUserId) return openSnackBar({ message: '알 수 없는 에러가 발생했어요' });

      //? 3. [공지 채채팅방에 유저 입장 시키기] : insert channel_user -> channel id: channel id
      await supabase.from('channel_user').insert({
        channel_id: Number(notice_channel_id),
        workspace_user_id: workspaceUserId
      });

      handleSetGlobalUser({ userId: user.id, workspaceId: workspaceId, workspaceUserId });

      setInviteCode('');
      return route.replace(`/${workspaceId}`);
    }

    //* 첫 회원가입 시
    // workspace_user테이블의 id값을 가져옴 user.id랑 같은것을 가져옴
    const workspaceUserId = await getWorkspaceUserIdMutation(user.id);

    // workspace_user테이블에 workspaceId 업데이트 (입력한 초대코드로 업데이트)
    await updateWorkspaceUserMutation({ workspaceId: workspaceId, userId: user.id });

    //? 3. [공지 채채팅방에 유저 입장 시키기] : insert channel_user -> channel id: channel id
    await supabase.from('channel_user').insert({
      channel_id: Number(notice_channel_id),
      workspace_user_id: workspaceUserId
    });

    handleSetGlobalUser({ userId: user.id, workspaceId: workspaceId, workspaceUserId });

    setInviteCode('');
    route.replace('/welcome');
  };

  const handleSubmitLoading =
    getWorkspaceIdWithInviteCodePending ||
    existingWorkspaceUserPending ||
    insertWorkspaceUserPending ||
    getWorkspaceUserIdPending ||
    updateWorkspaceUserPending;

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
          <form onSubmit={handleSubmit} className="lg:px-[55px] mb-[78px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <Input
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="초대 코드를 입력해주세요"
                />
              </div>
            </div>
            <Button type="submit" theme="primary" isDisabled={handleSubmitLoading} isFullWidth className="mt-4 ">
              {handleSubmitLoading ? '초대코드 확인 중...' : '확인'}
            </Button>
          </form>

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
