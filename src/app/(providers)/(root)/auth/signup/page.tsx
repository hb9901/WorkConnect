"use client";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const route = useRouter();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (session) {
        console.log("session", session);
        route.push("/user");
      }

      if (error) {
        return alert("사용자 정보가 일치하지 않습니다.");
      }
    },
  });

  const { mutate: emailLoginMutate } = loginMutation;

  if (loginMutation.isPending) return <div>로딩중</div>;

  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-dvh px-4">
        <div className="flex w-[375px] h-[52px] pt-[14px] pb-[12px] items-center">
          <button className="text-[20px] font-bold text-[#333333]">←</button>
        </div>
        <div className="flex-grow">
          <h1 className="text-[20px] text-[#2E2E2E] font-semibold pt-[42px] pb-[28px] flex items-center">
            정보 입력
          </h1>
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col">
              <label
                className="text-[14px] text-[#333] opacity-60 pl-[6px] pb-2"
                htmlFor="name"
              >
                이름
              </label>
              <input
                className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] focus:outline-none"
                type="text"
                id="name"
                placeholder="이름을 입력해주세요."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-[14px] text-[#333] opacity-60 pl-[6px] pb-2"
                htmlFor="email"
              >
                이메일 입력
              </label>
              <div className="flex gap-[12px]">
                <input
                  className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] focus:outline-none"
                  type="email"
                  id="email"
                  placeholder="이메일을 입력해주세요."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
                <button className="w-full text-lg py-[12px] px-[22px] bg-[#333] text-white rounded-lg shadow-md">
                  중복확인
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label
                className="text-[14px] text-[#333] opacity-60 pl-[6px] pb-2"
                htmlFor="password"
              >
                비밀번호
              </label>
              <input
                className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] focus:outline-none"
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>
            <div className="flex flex-col pb-[32px]">
              <label
                className="text-[14px] text-[#333] opacity-60 pl-[6px] pb-2"
                htmlFor="passwordCheck"
              >
                비밀번호 확인
              </label>
              <input
                className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] focus:outline-none"
                type="password"
                id="passwordCheck"
                placeholder="비밀번호를 입력해주세요."
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                required={true}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-4 sticky bottom-0 z-10 bg-white">
          <button
            onClick={() => emailLoginMutate()}
            className="w-full text-lg py-[12px] px-[22px] bg-[#333] text-white rounded-lg shadow-md"
          >
            인증 메일 발송
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
