"use client";
import { useMutation } from "@tanstack/react-query";
import Input from "./Input";
import { useState } from "react";
import { createClient } from "@/utils/supabase/supabaseClient";
import { useRouter } from "next/navigation";

type SignInProps = {
  setView: (view: string) => void;
};

const SignIn = ({ setView }: SignInProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClient();
  const route = useRouter();

  const signInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_API_URL
          ? `https://${process.env.NEXT_PUBLIC_API_URL}/api/signup/kakao`
          : "http://localhost:3000/api/signup/kakao",
      },
    });
    console.log("KAKAO_DATA : ", data);
  };

  const signInMutation = useMutation({
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

  return (
    <div className="flex flex-col gap-4">
      <div className="pt-10 pb-6 px-10 w-full max-w-lg flex flex-col items-center justify-center border-black border gap-2">
        <h1 className="text-2xl font-bold">로그인 페이지</h1>
        <div className="flex flex-col gap-2">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            type="email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            type="password"
          />
        </div>
        <button
          onClick={() => signInMutation.mutate()}
          disabled={signInMutation.isPending}
          color="light-blue"
          className="w-full rounded-md py-1 border border-black"
        >
          로그인
        </button>
        <button
          className="w-full rounded-md py-1 border border-black"
          onClick={signInWithKakao}
        >
          카카오 로그인
        </button>
      </div>

      <div className="py-4 w-full text-center max-w-lg border border-black bg-white">
        아직 계정이 없으신가요?{" "}
        <button
          className="text-light-blue-600 font-bold"
          onClick={() => setView("SIGNUP")}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignIn;
