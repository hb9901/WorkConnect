'use client';
import Typography from '@/components/Typography';
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
      <div className="flex flex-col justify-center items-center w-full h-dvh">
        <div className="flex flex-col items-center justify-center">
          <CheckCircleIcon className="w-[40px] h-[40px] stroke-primary200Main lg:w-[80.64px] lg:h-[80.64px]" />
          <Typography
            variant="Title20px"
            color="grey700Black"
            className="mb-[12px] mt-[18.5px] lg:text-[36px] lg:mb-5 lg:mt-[53px]"
          >
            가입 완료 !
          </Typography>
          <div className="flex flex-col justify-center items-center">
            <Typography variant="Subtitle16px" color="grey500" className="lg:text-[22px] ">
              워크스페이스 가입을 축하합니다.
            </Typography>
            <Typography variant="Subtitle16px" color="grey500" className="lg:text-[22px] ">
              새로운 멤버들과 활동을 시작해 보세요.
            </Typography>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUpCompletePage;
