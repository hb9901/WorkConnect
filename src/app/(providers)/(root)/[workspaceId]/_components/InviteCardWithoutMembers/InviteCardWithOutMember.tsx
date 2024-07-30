import Typography from '@/components/Typography';
import HandsIcon from '@/icons/Hands.svg';
import useUserStore from '@/store/userStore';
import { useParams } from 'next/navigation';
import InviteCodeButton from '../InviteCodeButton';

const InviteCardWithOutMember = () => {
  const params = useParams();
  const workspaceId = Number(params.workspaceId as string);
  const workspaceList = useUserStore((state) => state.workspaceList);
  const selectedWorkspace = workspaceList?.filter((workspace) => workspace.id === workspaceId)[0];

  if (!selectedWorkspace) return;

  return (
    <div className="flex flex-col items-center gap-[20px] px-[40px]">
      <HandsIcon className="w-[90px] h-[93px]" />
      <div className="flex flex-col gap-[8px] items-center">
        <Typography variant="Title18px" color="grey700Black" className="flex flex-col items-center">
          <div>동료들과 함께</div>
          <div>{selectedWorkspace.name}을 시작하세요 !</div>
        </Typography>
        <Typography>함께 일하는 동료들을 초대해보세요</Typography>
      </div>
      <InviteCodeButton workspaceId={selectedWorkspace.id} isFullWidth={true} />
    </div>
  );
};

export default InviteCardWithOutMember;
