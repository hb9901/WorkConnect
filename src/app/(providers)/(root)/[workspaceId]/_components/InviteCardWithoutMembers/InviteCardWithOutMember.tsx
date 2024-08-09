import ResponsiveTypography from '@/components/ResponsiveTypography';
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
        <ResponsiveTypography mobileVariant="Title18px" pcVariant="Title36px" color="grey700Black">
          <div>동료들과 함께</div>
          <div>{selectedWorkspace.name}을 시작하세요 !</div>
        </ResponsiveTypography>
        <ResponsiveTypography mobileVariant="Body14px" pcVariant="Body26px" color="grey500">
          함께 일하는 동료들을 초대해보세요
        </ResponsiveTypography>
      </div>
      <div className="w-[263px] lg:w-full">
        <InviteCodeButton workspaceId={selectedWorkspace.invite_code} isFullWidth={true} />
      </div>
    </div>
  );
};

export default InviteCardWithOutMember;
