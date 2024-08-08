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
    <div className="relative flex flex-col p-[28px] gap-[20px] bg-[#EBECFE] sm:px-[38px] sm:py-[54px] sm:gap-0 sm:justify-between sm:h-[317px]">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col gap-[8px] sm:gap-[16px]">
          {/*moblile 글씨*/}
          <Typography variant="Title18px" color="grey700Black" className="sm:hidden">
            <div>동료들과 함께</div>
            <div>{selectedWorkspace.name}을 시작하세요 !</div>
            <Typography variant="Body14px" color="grey500" className="sm:hidden">
              <div>함께 일하는 동료들을 초대해보세요.</div>
            </Typography>
          </Typography>
          {/*pc 글씨*/}
          <Typography variant="Title36px" color="grey700Black" className="hidden z-[5] sm:flex sm:flex-row">
            동료들과 함께 {selectedWorkspace.name}을 시작하세요 !
          </Typography>
          <Typography variant="Body26px" color="grey500" className="hidden z-[5] sm:flex sm:flex-row">
            <div>함께 일하는 동료들을 초대해보세요.</div>
          </Typography>
        </div>
        <div>
          <button onClick={handleCardClose}>
            <XIcon className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]" />
          </button>
        </div>
      </div>
      <div className="w-[114px] h-[36px] sm:w-[262px] sm:h-[52px]">
        <InviteCodeButton workspaceId={selectedWorkspace.invite_code} isFullWidth={true} />
      </div>
      <HandsIcon className="absolute right-[23px] bottom-[0px] w-[90px] h-[93px] sm:w-[254px] sm:h-[261px] sm:right-[118px]" />
    </div>
  );
};

export default inviteCardWithMember;
