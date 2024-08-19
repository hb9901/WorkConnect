import Button from '@/components/Button';
import ResponsiveTypography from '@/components/ResponsiveTypography';
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
      <Button
        theme="primary"
        isFullWidth={isFullWidth}
        onClick={() => {
          handleClick(workspaceId);
        }}
        className="!h-[36px] lg:!h-[56px]"
      >
        <ResponsiveTypography mobileVariant="Subtitle12px" pcVariant="Subtitle16px" color="white">
          초대 코드 복사
        </ResponsiveTypography>
      </Button>
    </>
  );
};

export default InviteCodeButton;
