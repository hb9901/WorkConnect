'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { signInWithKakao } from './auth/_utils/kakaoLogin';
import KakaoIcon from '@/icons/Kakao.svg';
import Typography from '@/components/Typography';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSnackBar } from '@/providers/SnackBarContext';
import Button from '@/components/Button';
import { useGetWorkspaceIdMutation, useGetWorkspaceUserIdMutation, useSignInMutation } from './_hook/useLogin';
import { LOGIN_ERROR_MESSAGE } from './_utils/constants';
import useSetGlobalUser from '@/hooks/useSetGlobalUser';

const LandingPage = () => {
  const [showSwiper, setShowSwiper] = useState(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const route = useRouter();
  const { openSnackBar } = useSnackBar();
  const { handleSetGlobalUser } = useSetGlobalUser();

  const { mutateAsync: postSignInMutation, isPending: signInPending } = useSignInMutation({
    onError: (error: any) => {
      if (error.message === LOGIN_ERROR_MESSAGE.INVALID_CREDENTIALS) {
        openSnackBar({ message: '이메일 또는 비밀번호가 일치하지 않아요' });
        return;
      }

      openSnackBar({ message: '로그인에 실패했어요' });
      return;
    }
  });

  const { mutateAsync: getWorkspaceIdMutation, isPending: workspaceIdPending } = useGetWorkspaceIdMutation({
    onError: () => {
      openSnackBar({ message: '문제가 발생했어요 (E-PGRST116)' });
      return;
    }
  });

  const { mutateAsync: getWorkspaceUserIdMutation, isPending: workspaceUserIdPending } = useGetWorkspaceUserIdMutation({
    onError: () => {
      openSnackBar({ message: '문제가 발생했어요' });
      return;
    }
  });
  const handleLoginPending = signInPending || workspaceIdPending || workspaceUserIdPending;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { id: userId } = await postSignInMutation({ email, password });
    const workspaceId = await getWorkspaceIdMutation(userId);
    const workspaceUserId = await getWorkspaceUserIdMutation(userId);

    if (workspaceId === null) {
      route.replace('/workspace/landing');
      return;
    }

    handleSetGlobalUser({ userId, workspaceId, workspaceUserId });
    route.replace(`/${workspaceId}`);
  };

  const handleClose = () => {
    setShowSwiper(false);
  };

  //? 컴포넌트 분리하기!!
  return (
    <main className="relative flex justify-center items-center">
      <div className="relative w-full h-dvh flex flex-col justify-center items-center">
        {showSwiper && (
          <div className="w-[375px] h-dvh relative flex flex-col lg:hidden">
            <Button type="button" theme="text" className="ml-auto" onClick={handleClose}>
              <Typography variant="Subtitle16px" color="grey400">
                건너뛰기
              </Typography>
            </Button>
            <div className="flex-grow flex items-center">
              <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                navigation
                pagination={{
                  clickable: true
                }}
              >
                {onboardingData.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-full">
                        <Image
                          className="w-full h-auto object-cover aspect-square"
                          src={item.image}
                          alt="일러스트 이미지"
                          width={375}
                          height={454}
                          unoptimized
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center h-[132px] text-[24px] font-bold mb-9">
                        <Typography variant="Title22px" className="text-center mb-3 " color="grey900">
                          {item.title}
                        </Typography>
                        <Typography
                          variant="Subtitle16px"
                          className="text-center whitespace-pre-line tracking-tighter "
                          color="grey500"
                        >
                          {item.subTitle}
                        </Typography>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
        <div className="flex w-full">
          <div className="w-full h-dvh relative flex-col justify-center items-center bg-[#FAFAFF] hidden lg:flex">
            <div className="w-[375px] flex-grow flex items-center">
              <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                navigation
                pagination={{
                  clickable: true
                }}
              >
                {onboardingData.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-full">
                        <Image
                          className="w-full h-auto object-cover aspect-square"
                          src={item.image}
                          alt="일러스트 이미지"
                          width={375}
                          height={454}
                          unoptimized
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center h-[132px] text-[24px] font-bold mb-9">
                        <Typography variant="Title22px" className="text-center mb-3 " color="grey900">
                          {item.title}
                        </Typography>
                        <Typography
                          variant="Subtitle16px"
                          className="text-center whitespace-pre-line tracking-tighter "
                          color="grey500"
                        >
                          {item.subTitle}
                        </Typography>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div
            className={`flex-col w-full h-dvh mx-4 lg:justify-center lg:mx-[155px] lg:flex ${showSwiper ? 'hidden' : 'flex'}`}
          >
            <Typography
              variant="Title20px"
              color="grey700Black"
              className="mt-8 mb-7 lg:text-[36px] lg:mt-0 lg:mb-[42px]"
            >
              로그인
            </Typography>
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-[24px]">
                <div className="flex flex-col">
                  <label className="text-[14px] text-[#2F323C] pl-[6px] pb-2" htmlFor="email">
                    이메일주소
                  </label>
                  <input
                    className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
                    type="email"
                    id="email"
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                  />
                </div>
                <div className="flex flex-col ">
                  <label className="text-[14px] text-[#2F323C] pl-[6px] pb-2" htmlFor="password">
                    비밀번호
                  </label>
                  <input
                    className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center mt-[28px] gap-4">
                <Button type="submit" theme="primary" isDisabled={handleLoginPending ? true : false} isFullWidth={true}>
                  {handleLoginPending ? '로그인 중...' : '로그인'}
                </Button>
              </div>
            </form>
            <div className="mt-4 mb-[18.5px]">
              <button
                onClick={signInWithKakao}
                className="flex justify-center items-center w-full h-[56px] text-lg font-medium bg-[#FEE502] rounded-lg text-[#3B1E1D] px-[22px] py-[12px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12)]"
              >
                <KakaoIcon className="h-6 w-6" />
                <span className="ml-3">카카오로 시작하기</span>
              </button>
            </div>
            <div className="flex justify-center items-center">
              <Link href="/auth/signup">
                <Typography as="span" variant="Body14px" color="grey500">
                  회원가입
                </Typography>
              </Link>
              <span className="text-[#5C6275] text-[11px] mx-3">|</span>
              {/* // TODO: MVP이후 비밀번호 찾기 구현  */}
              {/* <Link href="/"> */}
              <button onClick={() => alert('준비중입니다.')}>
                <Typography as="span" variant="Body14px" color="grey500">
                  비밀번호 찾기
                </Typography>
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const onboardingData = [
  {
    id: 1,
    image: '/images/onboarding/onboarding-todo.png',
    title: '나만의 똑똑한 일정관리',
    subTitle: `오늘 할 일을 계획하고,\n우선 순위 설정으로 중요한 일정을 놓칠 일이 없어요`
  },
  {
    id: 2,
    image: '/images/onboarding/onboarding-chat.png',
    title: '사내 업무공유와 채팅을 한번에 !',
    subTitle: '편리하고 심플한 업무용 메신저로 소통을 강화하고,\n직장 동료의 실시간 상태 확인으로 업무 효율을 높이세요'
  },
  {
    id: 3,
    image: '/images/onboarding/onboarding-meeting.png',
    title: '원할한 협업을 위한 화상회의',
    subTitle: '회의실로 직접 갈 필요 없이, 각자 자리에서 실시간으로\n시간을 절약하고, 협업의 효율성을 높이세요'
  }
];

export default LandingPage;
