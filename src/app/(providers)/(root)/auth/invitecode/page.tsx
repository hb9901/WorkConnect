'use client';

import { useRouter } from 'next/navigation';

const InviteCodePage = () => {
  const route = useRouter();
  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-dvh px-4">
        <div className="flex flex-col items-center mt-[109px] mb-[38px] gap-[12px]">
          <div className="w-[166px] h-[166px] bg-black"></div>
          <strong className="text-[20px] text-[#2E2E2E]">Title</strong>
          <p className="text-[14px] text-[rgb(46,46,46)] opacity-60 pl-[6px] pb-2">
            초대받은 이메일 또는 조직ID를 입력해주세요.
          </p>
        </div>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col">
            <input
              className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
              type="email"
              id="email"
              placeholder="이메일 또는 조직ID 입력."
              required={true}
            />
          </div>
        </div>
        <div className="flex justify-center mt-4 mb-[167px]">
          <button
            onClick={() => route.push('/auth/invitecode/newworkspace')}
            className="w-full text-lg py-[12px] px-[22px] bg-[#333] text-white rounded-lg shadow-md"
          >
            확인
          </button>
        </div>
        <div className="flex justify-center items-center py-2 px-4 gap-[10px]">
          <button className="text-[#333] text-center text-[14px] font-normal">도움말</button>
          <span className="text-[12px]">|</span>
          <button className="text-[#333] text-center text-[14px] font-normal">워크스페이스 만들기</button>
        </div>
      </div>
    </main>
  );
};

export default InviteCodePage;
