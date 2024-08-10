import ImageIcon from '@/icons/image.svg';
import PaperClipIcon from '@/icons/paperclip.svg';
import VideoIcon from '@/icons/video.svg';
import { mbToBytes } from '@/utils/file';
import FileButton from '../FileButton';
import { useMutationChatMessage } from '../../../_hooks/useMutationChat';
import { supabase } from '@/utils/supabase/supabaseClient';
import { ChatType } from '@/types/chat';
import { useSnackBar } from '@/providers/SnackBarContext';
import { useParams } from 'next/navigation';

const MAX_FILE_SIZE = mbToBytes(3);
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

  const uploadFile = async ({ blob, bucketName, fileType }: UploadFileProps) => {
    const { data, error } = await supabase.storage.from(bucketName).upload(`${Date.now()}`, blob);
    if (error) {
      openSnackBar({ message: '파일을 업로드하지 못했어요' });
      onFinish();
      return null;
    }

    mutateChatMessage({ content: `${RESOURCE_URL}${data.fullPath}`, type: fileType });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (!files) return;

    if (files[0]?.size >= MAX_FILE_SIZE) {
      openSnackBar({ message: '3MB가 넘는 파일은 업로드할 수 없어요' });
      onFinish();
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

export default UtilsMenu;
