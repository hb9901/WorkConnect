import Typography from '@/components/Typography';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import HandsIcon from '@/icons/Hands.svg';
import XIcon from '@/icons/X.svg';
import useUserStore from '@/store/userStore';
import InviteCodeButton from '../InviteCodeButton';

interface InviteCardWithOutMemberProps {
  handleCardClose: () => void;
}

const inviteCardWithMember = ({ handleCardClose }: InviteCardWithOutMemberProps) => {
  const workspaceId = useWorkspaceId();
  const workspaceList = useUserStore((state) => state.workspaceList);
  const selectedWorkspace = workspaceList?.filter((workspace) => workspace.id === workspaceId)[0];

  if (!selectedWorkspace) return;

  return (
    <div className="relative flex flex-col p-[28px] gap-[20px] bg-[#EBECFE]">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col gap-[8px]">
          <Typography variant="Title18px" color="grey700Black">
            <div>동료들과 함께</div>
            <div>{selectedWorkspace.name}을 시작해보세요 !</div>
          </Typography>
          <Typography variant="Body14px" color="grey500">
            <div>함께 일하는 동료들을 초대해보세요.</div>
          </Typography>
        </div>
        <div>
          <button onClick={handleCardClose}>
            <XIcon className="w-[24px] h-[24px]" />
          </button>
        </div>
      </div>
      <div>
        <InviteCodeButton workspaceId={selectedWorkspace.id} isFullWidth={false} />
      </div>
      <HandsIcon className="absolute right-[23px] bottom-[0px] w-[90px] h-[93px]" />
    </div>
  );
};

export default inviteCardWithMember;
