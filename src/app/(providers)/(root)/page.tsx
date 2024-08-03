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

const mockData = [
  {
    id: 1,
    image: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png'
  },
  {
    id: 2,
    image: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png'
  },
  {
    id: 3,
    image: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png'
  }
];
// TODO : 리팩터링 예정
const LandingPage = () => {
  return (
    <main className="relative flex justify-center items-center">
      <div className="w-[375px] h-dvh flex flex-col">
        <div className="flex-grow px-4 flex items-center">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            navigation
            pagination={{
              clickable: true
            }}
          >
            {mockData.map((item) => (
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
                  <div className="flex flex-col items-center justify-center h-[132px] text-[24px] font-bold">
                    <Typography variant="Title22px" className="text-center mb-5" color="grey900">
                      기능설명 TEXT
                      <br />
                      최대 2줄로!
                    </Typography>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="h-[148px]">
          <div className="w-full flex flex-col items-start gap-2 p-4">
            <button
              onClick={signInWithKakao}
              className="flex justify-center items-center w-full h-[56px] text-lg font-medium bg-[#FEE502] rounded-lg text-[#3B1E1D] px-[22px] py-[12px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12)]"
            >
              <KakaoIcon className="h-6 w-6" />
              <span className="ml-3">카카오로 시작하기</span>
            </button>
          </div>
          <div className="pb-7 text-[14px] text-[#2F323C] flex justify-center items-center gap-1">
            <Link href="/auth/login">
              <Typography as="span" variant="Body14px" color="grey700Black">
                이메일로 로그인
              </Typography>
            </Link>
            <span>ㅣ</span>
            <Link href="/auth/signup">
              <Typography as="span" variant="Body14px" color="grey700Black">
                회원가입
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
