'use client';

import useShallowSelector from '@/hooks/useShallowSelector';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { AuthStoreTypes } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSnackBar } from '@/providers/SnackBarContext';
import { getUserIdCookie } from '@/utils/cookie/workspace';
import { TopBar } from '@/components/TopBar';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Typography from '@/components/Typography';
import WorkConnectLogoIcon from '@/icons/WorkConnectLogo.svg';
import useSetGlobalUser from '@/hooks/useSetGlobalUser';
import {
  useCreateWorkspace,
  useCreateWorkspaceUser,
  useNewWorkspaceUserId,
  useSingleWorkspaceId,
  useUpdateNewWorkspaceUser
} from './_hooks/useNewWorkspace';
import { getRandomNumbers } from './_utils/randomNumbers';
import { supabase } from '@/utils/supabase/supabaseClient';

type UserType = {
  user: AuthStoreTypes['user'];
};

const NewWorkSpacePage = () => {
  const route = useRouter();
  const [orgName, setOrgName] = useState<string | ''>('');
  const [workUserData, setWorkUserData] = useState<{ id: string } | null>(null);
  const { user } = useShallowSelector<AuthStoreTypes, UserType>(useAuthStore, ({ user }) => ({ user }));
  const { openSnackBar } = useSnackBar();
  const { handleSetGlobalUser } = useSetGlobalUser();
  const cookieUserId = getUserIdCookie();
  const randomNumbers = getRandomNumbers(6, 1, 9);
  const combinedNumber = Number(randomNumbers.join(''));

  const { mutateAsync: createWorkspaceMutate, isPending: createWorkspacePending } = useCreateWorkspace({
    onError: () => openSnackBar({ message: '오류가 발생했어요' })
  });

  const { mutateAsync: createWorkspaceUserMutate, isPending: createWorkspaceUserPending } = useCreateWorkspaceUser({
    onError: () => openSnackBar({ message: '오류가 발생했어요' })
  });

  const { mutateAsync: updateNewWorkspaceUserMutate, isPending: updateNewWorkspaceUserPending } =
    useUpdateNewWorkspaceUser({
      onError: () => openSnackBar({ message: '오류가 발생했어요' })
    });

  const { mutateAsync: singleWorkspaceIdMutate, isPending: useSingleWorkspaceIdPending } = useSingleWorkspaceId({
    onError: () => openSnackBar({ message: '오류가 발생했어요' })
  });

  const handleJoin = async () => {
    if (!user) {
      openSnackBar({ message: '로그인이 필요해요' });
      return route.replace('/');
    }

    if (!orgName) return openSnackBar({ message: '조직 이름을 입력해주세요!' });

    if (!workUserData) return openSnackBar({ message: '워크스페이스에 유저 데이터가 없어요' });

    if (cookieUserId) {
      await createWorkspaceMutate({ orgName, combinedNumber, adminUserId: workUserData.id });

      const workspaceId = await singleWorkspaceIdMutate(workUserData.id);

      await createWorkspaceUserMutate({
        workspaceId: Number(workspaceId),
        userId: user.id,
        userName: user.user_metadata.name,
        userEmail: user.user_metadata.email
      });

      //? 워크스페이스 생성 하면서 공지방 추가하기 로직 추가

      //? 1. [공지채팅방 추가]: 워크스페이스 id를 얻었을 때 channel테이블에 정보를 insert하는 로직 추가
      const { data: channelData, error: channelError } = await supabase
        .from('channel')
        .insert({
          name: '전체_공지방',
          type: 'chat',
          workspace_id: workspaceId
        })
        .select()
        .single();
      console.log('channelData?.id', channelData?.id); //workspace_id,

      //? 2. [워크스페이스 데이터 수정: 공지 아이디를 저장] : data.channel id를 얻었으면, inset workspace에 eq(workspace id) 정보넣기 notice_channel_id
      // workspace테이블에 workspace id가 같은것에 notice_channel_id
      const { data: workspaceData, error: workspaceError } = await supabase
        .from('workspace')
        .update({
          notice_channel_id: channelData?.id
        })
        .eq('id', workspaceId)
        .select()
        .single();
      console.log('workspaceData', workspaceData);

      //? 3. [공지 채채팅방에 유저 입장 시키기] : insert channel_user -> channel id: channel id
      const { data: channelUserData, error: channelUserError } = await supabase
        .from('channel_user')
        .insert({
          channel_id: Number(channelData?.id),
          workspace_user_id: workUserData.id
        })
        .select();
      console.log('channelUserData', channelUserData);

      handleSetGlobalUser({
        userId: user.id,
        workspaceId: Number(workspaceId),
        workspaceUserId: workUserData.id
      });

      setOrgName('');
      return route.replace(`/${workspaceId}`);
    }

    //? 회원가입 후 첫 워크스페이스 생성
    await createWorkspaceMutate({ orgName, combinedNumber, adminUserId: workUserData.id });

    const workspaceId = await singleWorkspaceIdMutate(workUserData.id);

    await updateNewWorkspaceUserMutate({
      workspaceId: Number(workspaceId),
      userId: user.id
    });

    //? 워크스페이스 생성 하면서 해당 공지방으로 자동으로 들어갈 수 있게 추가하기 로직 추가

    //! 워크스페이스 생성
    //? 1. [공지채팅방 추가]: 워크스페이스 id를 얻었을 때 channel테이블에 정보를 insert하는 로직 추가
    const { data: channelData, error: channelError } = await supabase
      .from('channel')
      .insert({
        name: '전체_공지방',
        type: 'chat',
        workspace_id: workspaceId
      })
      .select()
      .single();
    console.log('channelData?.id', channelData?.id); //workspace_id,

    //? 2. [워크스페이스 데이터 수정: 공지 아이디를 저장] : data.channel id를 얻었으면, inset workspace에 eq(workspace id) 정보넣기 notice_channel_id
    // workspace테이블에 workspace id가 같은것에 notice_channel_id
    const { data: workspaceData, error: workspaceError } = await supabase
      .from('workspace')
      .update({
        notice_channel_id: channelData?.id
      })
      .eq('id', workspaceId)
      .select()
      .single();
    console.log('workspaceData', workspaceData);

    //? 3. [공지 채채팅방에 유저 입장 시키기] : insert channel_user -> channel id: channel id
    const { data: channelUserData, error: channelUserError } = await supabase
      .from('channel_user')
      .insert({
        channel_id: Number(channelData?.id),
        workspace_user_id: workUserData.id
      })
      .select();
    console.log('channelUserData', channelUserData);

    //! 4. 기존 워크스페이스 입장
    //? 1. [공지 채팅방에 유저 입장 시키기] : inset channel_user -> channel id: channel id

    handleSetGlobalUser({
      userId: user.id,
      workspaceId: Number(workspaceId),
      workspaceUserId: workUserData.id
    });

    setOrgName('');
    return route.replace('/welcome');
  };

  const joinPending =
    updateNewWorkspaceUserPending ||
    createWorkspaceUserPending ||
    createWorkspacePending ||
    useSingleWorkspaceIdPending;

  useEffect(() => {
    const getWorkspaceUser = async () => {
      if (!user) {
        openSnackBar({ message: '로그인이 필요합니다' });
        route.replace('/');
        return;
      }

      const newWorkspaceUserId = await useNewWorkspaceUserId(user.id);

      if (!newWorkspaceUserId) {
        openSnackBar({ message: '오류가 발생했어요' });
        return;
      }

      setWorkUserData({ id: newWorkspaceUserId });
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
                type="button"
                theme="primary"
                onClick={handleJoin}
                isDisabled={joinPending ? true : false}
                isFullWidth
              >
                <Typography variant="Subtitle18px" className="text-white">
                  가입하기
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
