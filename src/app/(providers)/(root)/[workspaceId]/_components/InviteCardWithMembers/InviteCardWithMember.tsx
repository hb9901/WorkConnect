import ResponsiveTypography from '@/components/ResponsiveTypography';
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
    <div className="relative flex flex-col px-[28px] pt-[28px] pb-[17px] gap-[20px] bg-[#EBECFE] lg:px-[38px] lg:py-[54px] lg:gap-0 lg:justify-between lg:h-[317px]">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col gap-[8px] z-[5] break-keep lg:gap-[16px]">
          {/*moblile 글씨*/}
          <Typography variant="Title18px" color="grey700Black" className="lg:hidden">
            <div>동료들과 함께</div>
            <div>워크스페이스를 시작하세요 !</div>
          </Typography>
          {/*pc 글씨*/}
          <Typography variant="Title36px" color="grey700Black" className="hidden lg:flex lg:flex-row">
            동료들과 함께 워크스페이스를 시작하세요 !
          </Typography>
          <ResponsiveTypography mobileVariant="Body16px" pcVariant="Body26px" color="grey500">
            함께 일하는 동료들을 초대해보세요.
          </ResponsiveTypography>
        </div>
        <div>
          <button onClick={handleCardClose}>
            <XIcon className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px]" />
          </button>
        </div>
      </div>
      <div className="w-[116px] lg:w-[262px] lg:h-[52px] z-[5]">
        <InviteCodeButton workspaceId={selectedWorkspace.invite_code} isFullWidth={true} />
      </div>
      <HandsIcon className="absolute right-[23px] bottom-[0px] w-[90px] h-[93px] lg:w-[254px] lg:h-[261px] lg:right-[118px]" />
    </div>
  );
};

export default inviteCardWithMember;
