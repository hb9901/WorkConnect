'use client';
import { CheckCircleIcon } from '@/icons';
import useUserStore from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SignUpCompletePage = () => {
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const user = useUserStore((state) => state);
  const route = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setHidden(true), 500);
      route.replace(`/${user.workspaceId}`);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className={`flex justify-center ${fadeOut ? 'opacity-0 transition-opacity duration-500' : ''} ${hidden ? 'hidden' : ''}`}
    >
      <div className="flex flex-col justify-center items-center w-[375px] h-dvh">
        <div className="flex flex-col items-center justify-center">
          <CheckCircleIcon className="w-[40px] h-[40px] stroke-primary200Main" />
          <strong className="text-[20px] text-[#2F323C] mt-[18.5px] mb-3">가입 완료 !</strong>
          <div className="flex flex-col justify-center items-center text-[#5C6275]">
            <p>워크스페이스 가입을 축하합니다.</p>
            <p>새로운 멤버들과 활동을 시작해 보세요.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUpCompletePage;
