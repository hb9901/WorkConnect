import useChannel from '@/hooks/useChannel';

// 해당 파일은 임시 파일 입니다.
const VideoList = () => {
  const { channelList } = useChannel('video');

  return <div>VideoList</div>;
};

export default VideoList;
