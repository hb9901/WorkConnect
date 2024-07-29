import Button from '@/components/Button';
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
    // button에 icon 넣고 싶음
    <Button theme="primary" isFullWidth={true} onClick={handleClick}>
      {/* {isMyPage ? '' : <MessageCircleIcon />} */}
      {isMyPage ? '프로필 편집' : '메시지 보내기'}
    </Button>
  );
};

export default EditOrMessageButton;
