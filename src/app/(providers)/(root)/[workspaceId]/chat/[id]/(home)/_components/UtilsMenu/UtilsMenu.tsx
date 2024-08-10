'use client';

import ImageIcon from '@/icons/image.svg';
import PaperClipIcon from '@/icons/paperclip.svg';
import VideoIcon from '@/icons/video.svg';
import { mbToBytes } from '@/utils/file';
import FileButton from '../FileButton';
import { ChatType } from '@/types/chat';
import { useSnackBar } from '@/providers/SnackBarContext';
import { useParams } from 'next/navigation';
import { useMutationChatMessage, useMutationUploadFile } from '../../../../_hook/useChatMutation';
import { STORAGE_BUCKET_NAME } from '../../../../_constants/constants';

const MAX_FILE_SIZE = 3;

type UploadFileProps = {
  formData: FormData;
  bucketName: string;
  fileType: ChatType['type'];
};

const CHAT_TYPE: Record<string, ChatType['type']> = {
  imageFile: 'image',
  videoFile: 'video',
  documentFile: 'document'
};

const UtilsMenu = ({ handleOpenUtil }: { handleOpenUtil: () => void }) => {
  const { id } = useParams();

  const onFinish = () => {
    handleOpenUtil();
  };

  const { openSnackBar } = useSnackBar();

  const { mutate: mutateChatMessage } = useMutationChatMessage({
    channel_id: Number(id),
    onSuccess: onFinish
  });

  const { mutateAsync: mutateUploadFile } = useMutationUploadFile({
    onSuccess: onFinish
  });

  const uploadFile = async ({ formData, bucketName, fileType }: UploadFileProps) => {
    const { data } = await mutateUploadFile({ formData, storagePath: bucketName, maxFileSize: MAX_FILE_SIZE });
    if (!data) {
      openSnackBar({ message: '파일을 업로드하지 못했어요' });
      onFinish();
      return null;
    }

    mutateChatMessage({ content: data, type: fileType });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (!files) return;

    if (files[0]?.size >= mbToBytes(MAX_FILE_SIZE)) {
      openSnackBar({ message: `${MAX_FILE_SIZE}MB가 넘는 파일은 업로드할 수 없어요` });
      onFinish();
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0]);

    uploadFile({
      formData,
      bucketName: STORAGE_BUCKET_NAME[name],
      fileType: CHAT_TYPE[name]
    });
  };

  return (
    <div className="w-full bg-white gap-2 px-4 grid grid-cols-4 pt-3 pb-[15px]">
      <FileButton title="사진" name="imageFile" accept="image/*" onChange={handleChange}>
        <ImageIcon className="text-white stroke-current" />
      </FileButton>
      <FileButton title="동영상" name="videoFile" accept="video/*" onChange={handleChange}>
        <VideoIcon className="text-white stroke-current" />
      </FileButton>
      <FileButton title="파일" name="documentFile" accept=".pdf,.doc,.docx" onChange={handleChange}>
        <PaperClipIcon className="text-white stroke-current" />
      </FileButton>
    </div>
  );
};

export default UtilsMenu;
