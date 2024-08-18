import Button from '@/components/Button';
import Typography from '@/components/Typography';
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
      openSnackBar({ message: '초대 코드를 복사했어요' });
    } catch (err) {
      openSnackBar({ message: '초대 코드 복사에 실패했어요' });
    }
  };

  return (
    <>
      {/*모바일*/}
      <Button
        theme="primary"
        isFullWidth={isFullWidth}
        onClick={() => {
          handleClick(workspaceId);
        }}
        isSmall
        className="flex lg:hidden"
      >
        <Typography variant="Subtitle12px" color="white">
          초대 코드 복사
        </Typography>
      </Button>
      {/*PC*/}
      <Button
        theme="primary"
        isFullWidth={isFullWidth}
        onClick={() => {
          handleClick(workspaceId);
        }}
        className="hidden lg:flex"
      >
        <Typography variant="Subtitle16px" color="white">
          초대 코드 복사
        </Typography>
      </Button>
    </>
  );
};

export default InviteCodeButton;
