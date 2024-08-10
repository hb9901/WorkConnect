'use client';

import { useRef, useState } from 'react';
import { useSearchUsers } from '../_provider/SearchUsersProvider';
import useCreateChannel from '../_hooks/useCreateChannel';
import { useSearchParams } from 'next/navigation';
import type { ChannelType } from '@/types/channel';
import { useSnackBar } from '@/providers/SnackBarContext';
import { mbToBytes } from '@/utils/file';
import FileInput from '@/components/FileInput';
import AddChannelLayout from '../_components/AddChannelLayout';
import ThumbnailInput from './_components/ThumbnailInput';
import GroupNameInput from './_components/GroupNameInput';
import { useMutationUploadThumbnail } from '../../_hooks/useChannelMutation';

const MAX_FILE_SIZE = 3;

const GroupSettingPage = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') as ChannelType['type'];
  const ref = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { getSelectedUserIds } = useSearchUsers();
  const { handleCreateChannelAndUsers } = useCreateChannel();
  const { openSnackBar } = useSnackBar();
  const [thumbnail, setThumbnail] = useState<string>('');

  const { mutateAsync: uploadThumbnail } = useMutationUploadThumbnail({
    onError: () => {
      openSnackBar({ message: '파일을 업로드하지 못했어요' });
      return;
    }
  });

  const handleClick = () => {
    fileRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!ref.current?.value) {
      openSnackBar({ message: '채팅방 이름을 입력해주세요' });
      return;
    }

    const userIds = getSelectedUserIds();

    handleCreateChannelAndUsers({ channelName: ref.current.value, userIds, type, thumbnail });
  };

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;

    if (files[0]?.size >= mbToBytes(MAX_FILE_SIZE)) {
      openSnackBar({ message: `${MAX_FILE_SIZE}MB가 넘는 파일은 업로드할 수 없어요` });
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0]);

    const { data } = await uploadThumbnail({ formData, storagePath: 'channels' });
    if (!data) return;

    setThumbnail(data);
  };

  return (
    <AddChannelLayout title="그룹대화방 설정" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 p-4 h-[300px] w-[300px] items-center justify-center mx-auto">
        <ThumbnailInput thumbnail={thumbnail} handleClick={handleClick} />
        <GroupNameInput ref={ref} />
      </div>
      <FileInput name="thumbnail" accept="image/*" ref={fileRef} onChange={onChange} />
    </AddChannelLayout>
  );
};

export default GroupSettingPage;
