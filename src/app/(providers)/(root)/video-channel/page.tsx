'use client';

import { useRouter } from 'next/navigation';
import VideoList from './_components/VideoList';

const MakeVideoCallRoom = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-[100vh] justify-center items-center">
      <header className="flex gap-1">
        <h1>방 목록</h1>
      </header>
      <div className="w-[50vw]">
        <VideoList />
        <button
          onClick={() => router.push('/video-channel/create')}
          className="border rounded-full h-5 flex justify-center items-center hover:bg-slate-200"
        >
          채팅방 생성
        </button>
      </div>
    </div>
  );
};

export default MakeVideoCallRoom;
