import Button from '@/components/Button';

interface InviteCodeButtonProps {
  workspaceId: number;
  isFullWidth: boolean;
}

const InviteCodeButton = ({ workspaceId, isFullWidth }: InviteCodeButtonProps) => {
  const handleClick = async (workspaceId: number) => {
    try {
      const workspaceIdStr = String(workspaceId);
      await navigator.clipboard.writeText(workspaceIdStr);
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
