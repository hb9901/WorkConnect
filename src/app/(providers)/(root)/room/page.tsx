"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const MakeVideoCallRoom = () => {
  const router = useRouter();
  const [roomName, setRoomName] = useState<string>("");
  // 추후 유저정보 받아올 수 있으면 수정
  const [userName, setUserName] = useState<string>("");

  const handleInputRoomName = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const handleInputUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (roomName && userName) {
      // 필수 값 확인
      router.push(`/room/${roomName}?username=${userName}`);
    } else {
      // 필수 값이 없으면 경고 표시 (필수 필드 체크)
      alert("방이름과 사용자 이름을 입력해 주세요.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-[100vh] justify-center items-center"
    >
      <h1>방 생성</h1>
      <input
        className="border border-1"
        type="text"
        value={roomName}
        placeholder="방이름"
        onChange={handleInputRoomName}
      />
      <input
        className="border border-1"
        type="text"
        value={userName}
        placeholder="유저 이름"
        onChange={handleInputUserName}
      />
      <button className="border-4" type="submit">
        방 생성
      </button>
    </form>
  );
};

export default MakeVideoCallRoom;
