"use client";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
        <h1 className="text-[20px] text-[#2E2E2E] font-semibold pt-[42px] pb-[28px] flex items-center">
          이메일로 로그인
        </h1>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col">
            <label
              className="text-[14px] text-[#333] opacity-60 pl-[6px] pb-2"
              htmlFor="email"
            >
              이메일주소
            </label>
            <input
              className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] focus:outline-none"
              type="email"
              id="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
          </div>
          <div className="flex flex-col pb-[13px] ">
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
        </div>
        <div className="flex justify-center pb-4">
          <button
            onClick={() => emailLoginMutate()}
            className="w-full text-lg py-[12px] px-[22px] bg-[#333] text-white rounded-lg shadow-md"
          >
            로그인
          </button>
        </div>
        <button className="text-[#333] text-center text-[12px] font-normal underline">
          비밀번호를 잊으셨나요?
        </button>
      </div>
    </main>
  );
};

export default LoginPage;
