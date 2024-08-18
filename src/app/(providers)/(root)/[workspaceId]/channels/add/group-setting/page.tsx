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
import VideoChatAvatar from '@/components/VideoChatAvatar';
import Typography from '@/components/Typography';
import Button from '@/components/Button';

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

  const handleFileClick = () => {
    fileRef.current?.click();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

  const isVideo = type === 'video';
  const title = isVideo ? '화상대화방 설정' : '그룹대화방 설정';

  return (
    <form onSubmit={handleSubmit}>
      <AddChannelLayout title={title}>
        <div className="flex flex-col w-full max-w-[550px] items-center justify-center px-4 pt-[66px] mx-auto flex-1 lg:px-0 lg:pt-0">
          {isVideo ? (
            <VideoChatAvatar size="140px" />
          ) : (
            <ThumbnailInput thumbnail={thumbnail} handleClick={handleFileClick} />
          )}
          <GroupNameInput ref={ref} className="mt-[38px]" />
          <Typography as="p" variant="Body12px" className="text-grey300 w-full mt-4">
            설정하는 사진과 이름은 모든 대화상대에게도 동일하게 보입니다.
          </Typography>
          <Button theme="primary" type="submit" isFullWidth className="max-w-[440px] mx-auto mt-[64px] hidden lg:block">
            채팅방 생성
          </Button>
        </div>
        <FileInput name="thumbnail" accept="image/*" ref={fileRef} onChange={onChange} />
      </AddChannelLayout>
    </form>
  );
};

export default GroupSettingPage;
