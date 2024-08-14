'use client';

import ImageIcon from '@/icons/image.svg';
import PaperClipIcon from '@/icons/paperclip.svg';
import VideoIcon from '@/icons/video.svg';
import FileButton from '../FileButton';
import { STORAGE_BUCKET_NAME } from '../../../../_constants/constants';
import useFileUpload from '../../_hooks/useFileUpload';

type StorageBucketNameKeys = keyof typeof STORAGE_BUCKET_NAME;

const UtilsMenu = ({ handleOpenUtil }: { handleOpenUtil: () => void }) => {
  const { handleFileUpload } = useFileUpload(handleOpenUtil);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (!files) return;

    handleFileUpload({
      blob: files[0],
      name: name as StorageBucketNameKeys
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
