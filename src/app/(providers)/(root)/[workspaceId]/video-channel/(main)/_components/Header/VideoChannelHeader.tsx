import Button from '@/components/Button';
import Typography from '@/components/Typography';
import ArrowLeftIcon from '@/icons/ArrowLeft.svg';
import { useParams } from 'next/navigation';
import { HeaderProps } from './Header';
const VideoChannelHeader = ({ back, next }: HeaderProps) => {
  const params = useParams();
  let name = decodeURIComponent(params.name as string);
  return (
    <div className="flex items-center justify-between px-4 py-3 mt-[2px]">
      <ArrowLeftIcon className="size-7" onClick={back} />
      <Typography color="grey700Black" variant="Title20px" as="h2">
        {name}
      </Typography>
      <Button theme="text" onClick={next} className="size-10">
        다음
      </Button>
    </div>
  );
};

export default VideoChannelHeader;
