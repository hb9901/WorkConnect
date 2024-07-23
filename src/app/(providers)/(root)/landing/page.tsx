"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { signInWithKakao } from "../auth/utils/kakaoLogin";
import Image from "next/image";

const mockData = [
  {
    id: 1,
    image:
      "https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg",
  },
  {
    id: 2,
    image:
      "https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg",
  },
  {
    id: 3,
    image:
      "https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg",
  },
];

const LandingPage = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className}"></span>`;
    },
  };
  return (
    <main className="flex justify-center items-center">
      <div className="w-[375px] h-dvh flex flex-col">
        <div className="flex-grow px-4">
          {/* 스와이퍼 */}
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            navigation
            // pagination={pagination}
            pagination={{
              clickable: true,
              bulletActiveClass: "bg-[#050505]",
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
            <button>이메일로 로그인</button> ㅣ <button>회원가입</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
