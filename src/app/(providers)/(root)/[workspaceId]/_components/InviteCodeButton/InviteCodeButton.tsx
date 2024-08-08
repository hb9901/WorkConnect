import Button from '@/components/Button';
import { useSnackBar } from '@/providers/SnackBarContext';

interface InviteCodeButtonProps {
  workspaceId: number;
  isFullWidth: boolean;
}

const InviteCodeButton = ({ workspaceId, isFullWidth }: InviteCodeButtonProps) => {
  const { openSnackBar } = useSnackBar();
  const handleClick = async (workspaceId: number) => {
    try {
      const workspaceIdStr = String(workspaceId);
      await navigator.clipboard.writeText(workspaceIdStr);
      openSnackBar({ message: '초대 코드가 복사되었습니다.' });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Button
      theme="primary"
      isFullWidth={isFullWidth}
      onClick={() => {
        handleClick(workspaceId);
      }}
    >
      초대 코드 복사
    </Button>
  );
};

export default InviteCodeButton;
