"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { signInWithKakao } from "../auth/_utils/kakaoLogin";
import Image from "next/image";
import Link from "next/link";

const mockData = [
  {
    id: 1,
    image:
      "https://i.namu.wiki/i/Ey2pLW6NB_RoUwBzIj42eKLxixpUK-KCePuGVvmvhd2Tb3Eq7rHpWqM2lp7lIIDbB0J7H8ZMpw8MhtuVp7yaWQ.webp",
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/236x/d9/82/f4/d982f4ec7d06f6910539472634e1f9b1.jpg",
  },
  {
    id: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsRvgWUFXBmrPxQVvWcK95oyh8_jQWO7ZQ0A_TmFbv9Y-66UhyOQHffksZxQdw7HV8Nio&usqp=CAU",
  },
];

const LandingPage = () => {
  return (
    <main className="flex justify-center items-center">
      <div className="w-[375px] h-dvh flex flex-col">
        <div className="flex-grow px-4">
          {/* 스와이퍼 */}
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            navigation
            pagination={{
              clickable: true,
            }}
          >
            {mockData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="flex flex-col items-center justify-center">
                  <div className="w-full h-[454px]">
                    <Image
                      className="h-full object-cover"
                      src={item.image}
                      alt="일러스트 이미지"
                      width={375}
                      height={454}
                      unoptimized
                      loading="eager"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center h-[132px] text-[24px] font-bold">
                    <p>기능설명 TEXT</p>
                    <p>최대 2줄로!</p>
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
              className="flex justify-center items-center w-full h-[56px] text-lg font-medium bg-[#333] rounded-lg text-white px-[22px] py-[12px]"
            >
              카카오로 시작하기
            </button>
          </div>
          <div className="pb-7 text-[14px] text-[#333] flex justify-center items-center ">
            <Link href="/auth/login">이메일로 로그인</Link> ㅣ{" "}
            <Link href="/auth/signup">회원가입</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
