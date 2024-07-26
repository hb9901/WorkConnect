import useChannel from '@/hooks/useChannel';
import { useRouter } from 'next/navigation';
import VideoListItem from '../VideoListItem';

// 해당 파일은 임시 파일 입니다.
const VideoList = () => {
  // 전역으로 관리 되어야 할듯
  const workspace_id = 2;
  const userName = 'minkon';

  const router = useRouter();
  const { channelList } = useChannel('video', workspace_id);

  if (!channelList) {
    return <div>목록이 없습니다..</div>;
  }
  const handleSubmit = (e: MouseEvent, roomName: string) => {
    e.preventDefault();

    // TODO: DB에 방 추가 하는 로직 작성 해야함.
    if (roomName && userName) {
      router.push(`/video-channel/${roomName}?username=${userName}`);
    } else {
      alert('방이름과 사용자 이름을 입력해 주세요.');
    }
  };
  return (
    <div className="m-5">
      {channelList.map((channel) => (
        <VideoListItem key={channel.id} id={channel.id} name={channel.name as string} type={channel.type as string} />
      ))}
    </div>
  );
};

export default VideoList;
