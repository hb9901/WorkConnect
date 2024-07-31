import ImageIcon from '@/icons/image.svg';
import PaperClipIcon from '@/icons/paperclip.svg';
import VideoIcon from '@/icons/video.svg';
import { mbToBytes } from '@/utils/file';
import FileButton from '../FileButton';
import { useMutationChatMessage } from '../../../_hooks/useMutationChat';
import { supabase } from '@/utils/supabase/supabaseClient';
import { ChatType } from '@/types/chat';

const MAX_FILE_SIZE = mbToBytes(3);
const WORKSPACE_USER_ID = '2b5cc93d-1353-4adb-a8c5-60855dc4e5a2';
const RESOURCE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/`;

type UploadFileProps = {
  blob: Blob;
  bucketName: string;
  fileType: ChatType['type'];
};

const STORAGE_BUCKET_NAME: Record<string, string> = {
  imageFile: 'photos',
  videoFile: 'videos',
  documentFile: 'documents'
};

const CHAT_TYPE: Record<string, ChatType['type']> = {
  imageFile: 'image',
  videoFile: 'video',
  documentFile: 'document'
};

const UtilsMenus = () => {
  const { mutate: mutateChatMessage } = useMutationChatMessage({
    channel_id: Number(4),
    workspace_user_id: WORKSPACE_USER_ID
  });

  const uploadFile = async ({ blob, bucketName, fileType }: UploadFileProps) => {
    const { data, error } = await supabase.storage.from(bucketName).upload(`${Date.now()}`, blob);
    if (error) {
      console.error('파일 업로드 오류:', error);
      return null;
    }

    mutateChatMessage({ content: `${RESOURCE_URL}${data.fullPath}`, type: fileType, is_notice: false });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (!files) return;

    if (files[0].size >= MAX_FILE_SIZE) {
      alert('파일 크기가 3MB를 초과합니다.');
      return;
    }

    uploadFile({
      blob: files[0],
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

export default UtilsMenus;
