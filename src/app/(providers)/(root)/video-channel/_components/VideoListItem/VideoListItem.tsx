'use client';
import { useRouter } from 'next/navigation';

type VieoListItemType = {
  id: number;
  name: string;
  type: string;
};
const VideoListItem = ({ id, name, type }: VieoListItemType) => {
  const userName = 'minkon'; // 전역 관리 되야 하는 유저 정보.
  const router = useRouter();
  const handleClick = () => {
    // TODO: DB에 방 추가 하는 로직 작성 해야함.
    if (name && userName) {
      router.push(`/video-channel/${name}?username=${userName}`);
    } else {
      alert('방이름과 사용자 이름을 입력해 주세요.');
    }
  };
  return (
    <div key={id} onClick={handleClick} className="border border-1 flex flex-col gap-3 hover:bg-slate-500">
      <span>{name}</span>
      <span>{type}</span>
    </div>
  );
};

export default VideoListItem;
