import Button from '@/components/Button';
import Typography from '@/components/Typography';
import ArrowIcon from '@/icons/ArrowIcon.svg';
const VideoChannelCreateHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 mt-[2px]">
      <ArrowIcon className="size-7" />
      <Typography color="grey700Black" variant="Title20px" as="h2">
        대화상대 선택
      </Typography>
      <Button theme="text">다음</Button>
    </div>
  );
};

export default VideoChannelCreateHeader;


