import Typography from '@/components/Typography';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import HandsIcon from '@/icons/Hands.svg';
import useUserStore from '@/store/userStore';
import InviteCodeButton from '../InviteCodeButton';

const InviteCardWithOutMember = () => {
  const workspaceId = useWorkspaceId();
  const workspaceList = useUserStore((state) => state.workspaceList);
  const selectedWorkspace = workspaceList?.filter((workspace) => workspace.id === workspaceId)[0];

  if (!selectedWorkspace) return;

  return (
    <div className="flex flex-col items-center gap-[20px] px-[40px] lg:gap-[54px] lg:mx-au">
      <HandsIcon className="w-[90px] h-[93px] lg:w-[281px] lg:h-[291px]" />
      <div className="flex flex-col gap-[8px] items-center lg:gap-[16px]">
        {/*모바일*/}
        <Typography variant="Title18px" color="grey700Black" className="flex flex-col items-center lg:hidden">
          <div>동료들과 함께</div>
          <div>{selectedWorkspace.name}을 시작하세요 !</div>
        </Typography>
        <Typography variant="Body14px" color="grey500" className="lg:hidden">
          함께 일하는 동료들을 초대해보세요
        </Typography>
        {/*pc*/}
        <Typography variant="Title36px" color="grey700Black" className="hidden lg:flex lg:flex-col lg:items-center">
          <div>동료들과 함께</div>
          <div>{selectedWorkspace.name}을 시작하세요 !</div>
        </Typography>
        <Typography variant="Body26px" color="grey500" className="hidden lg:flex">
          함께 일하는 동료들을 초대해보세요
        </Typography>
      </div>
      <div className="w-[263px] lg:w-full">
        <InviteCodeButton workspaceId={selectedWorkspace.invite_code} isFullWidth={true} />
      </div>
    </div>
  );
};

export default InviteCardWithOutMember;
