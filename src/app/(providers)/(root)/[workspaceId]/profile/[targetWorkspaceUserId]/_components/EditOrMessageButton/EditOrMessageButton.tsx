import Button from '@/components/Button';
import MessageCircleIcon from '@/icons/MessageCircle.svg';
import { useRouter } from 'next/navigation';

interface EditOrMessageButtonProsp {
  isMyPage: boolean;
}

const EditOrMessageButton = ({ isMyPage }: EditOrMessageButtonProsp) => {
  const router = useRouter();

  const handleClick = () => {
    if (isMyPage) {
      router.push('/profile/edit');
    }
  };

  return (
    <Button theme="primary" isFullWidth={true} onClick={handleClick}>
      {isMyPage ? '' : <MessageCircleIcon />}
      {isMyPage ? '프로필 편집' : '메시지 보내기'}
    </Button>
  );
};

export default EditOrMessageButton;
