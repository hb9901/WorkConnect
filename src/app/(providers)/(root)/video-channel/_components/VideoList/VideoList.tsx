import useChannel from '@/hooks/useChannel';
import { useRouter } from 'next/navigation';
import VideoListItem from '../VideoListItem';

// 해당 파일은 임시 파일 입니다.
const VideoList = () => {
  // 전역으로 관리 되어야 할듯
  const workspace_id = 2;
  const userName = 'minkon';

  const router = useRouter();
  const { channelList } = useChannel({ type: 'video', workspace_id });

  if (!channelList) {
    return <div>목록이 없습니다..</div>;
  }

  return (
    <div className="m-5">
      {channelList.map((channel) => (
        <VideoListItem id={channel.id} name={channel.name as string} type={channel.type as string} />
      ))}
    </div>
  );
};

export default VideoList;
