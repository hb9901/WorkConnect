'use client';

import { useRef, useState } from 'react';
import { useSearchUsers } from '../_provider/SearchUsersProvider';
import useCreateChannel from '../_hooks/useCreateChannel';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ChannelType } from '@/types/channel';
import { PageLayout } from '@/components/PageLayout';
import { AvatarIcon, CameraIcon, CheckIcon, XIcon } from '@/icons';
import { supabase } from '@/utils/supabase/supabaseClient';
import FileInput from '../../[id]/_components/FileInput';
import { useSnackBar } from '@/providers/SnackBarContext';
import { mbToBytes } from '@/utils/file';
import Image from 'next/image';

const MAX_FILE_SIZE = mbToBytes(3);

const RESOURCE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/`;

const GroupSettingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') as ChannelType['type'];
  const ref = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { getSelectedUserIds } = useSearchUsers();
  const { handleCreateChannelAndUsers } = useCreateChannel();
  const { openSnackBar } = useSnackBar();
  const [thumbnail, setThumbnail] = useState<string>('');

  const handleClick = () => {
    fileRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!ref.current?.value) {
      alert('그룹채팅방 이름을 입력해주세요.');
      return;
    }

    const userIds = getSelectedUserIds();

    if (userIds.length < 2) {
      return;
    }

    handleCreateChannelAndUsers({ channelName: ref.current.value, userIds, type, thumbnail });
  };

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;

    if (files[0]?.size >= MAX_FILE_SIZE) {
      openSnackBar({ message: '3MB가 넘는 파일은 업로드할 수 없어요' });
      return;
    }

    const { data, error } = await supabase.storage.from('channels').upload(`${Date.now()}`, files[0]);
    if (error) {
      openSnackBar({ message: '파일을 업로드하지 못했어요' });
      return;
    }

    setThumbnail(`${RESOURCE_URL}${data.fullPath}`);
  };

  return (
    <PageLayout
      title="그룹대화방 설정"
      showBottomBar={false}
      TopBarLeftIcon1={<XIcon onClick={() => router.back()} />}
      TopBarRightIcon1={
        <button onClick={handleSubmit}>
          <CheckIcon />
        </button>
      }
    >
      <div className="flex flex-col gap-4 p-4 h-[300px] w-[300px] items-center justify-center mx-auto">
        <div className="relative">
          <div
            className="w-[140px] h-[140px] bg-[#BDBDBD] rounded-full flex flex-col items-center justify-center overflow-hidden"
            onClick={handleClick}
          >
            {thumbnail ? (
              <Image src={thumbnail} alt="" className="w-[140px] h-[140px] object-cover" width={140} height={140} />
            ) : (
              <AvatarIcon className="w-[84px] h-[84px] bg-[#BDBDBD]" />
            )}
          </div>
          <div className="absolute bottom-0 right-0 z-10 flex items-center justify-center w-[46px] h-[46px] rounded-full bg-[#FAFAFA] pointer-events-none">
            <CameraIcon className="w-[24px] h-[24px]" />
          </div>
        </div>
        <input
          ref={ref}
          type="text"
          className="text-black border-b border-gray-300 w-full h-[45px]"
          placeholder="그룹대화방 이름"
        />
      </div>
      <FileInput name="thumbnail" accept="image/*" ref={fileRef} onChange={onChange} />
    </PageLayout>
  );
};

export default GroupSettingPage;
