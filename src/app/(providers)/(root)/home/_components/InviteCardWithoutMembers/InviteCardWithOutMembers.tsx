import Button from '@/components/Button';
import Typography from '@/components/Typography';
import HandsIcon from '@/icons/Hands.svg';

const InviteCardWithOutMembers = () => {
  const workspaceName = '예시용 워크스페이스';
  return (
    <div className="flex flex-col items-center w-full gap-[20px] px-[40px]">
      <HandsIcon className="w-[90px] h-[93px]" />
      <div className="flex flex-col gap-[8px] items-center">
        <Typography variant="Title18px" color="grey700Black" className="flex flex-col items-center">
          <div>동료들과 함께</div>
          <div>{workspaceName}을 시작하세요 !</div>
        </Typography>
        <Typography>함께 일하는 동료들을 초대해보세요</Typography>
      </div>
      <Button theme="primary" isFullWidth={true}>
        초대 코드 복사
      </Button>
    </div>
  );
};

export default InviteCardWithOutMembers;
