import Button from '@/components/Button';
import Typography from '@/components/Typography';
import HandsIcon from '@/icons/Hands.svg';
import XIcon from '@/icons/X.svg';

interface InviteCardWithMembersProps {
  handleCardClose: () => void;
}

const inviteCardWithMembers = ({ handleCardClose }: InviteCardWithMembersProps) => {
  const workspaceName = '예시용 워크스페이스';
  return (
    <div className="relative flex flex-col p-[28px] gap-[20px] bg-[#EBECFE]">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col gap-[8px]">
          <Typography variant="Title18px" color="grey700Black">
            <div>동료들과 함께</div>
            <div>{workspaceName}을 시작해보세요 !</div>
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
        <Button theme="primary">초대 코드 복사</Button>
      </div>
      <HandsIcon className="absolute right-[23px] bottom-[0px] w-[90px] h-[93px]" />
    </div>
  );
};

export default inviteCardWithMembers;
