"use client";
import { createClient } from "@/utils/supabase/supabaseClient";
import Input from "./Input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type SignUpProps = {
  setView: (view: string) => void;
};

const SignUp = ({ setView }: SignUpProps) => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmRequired, setConfirmRequired] = useState(false);
  const route = useRouter();

  const supabase = createClient();
  // 회원가입 mutation
  const signUpMutation = useMutation({
    mutationFn: async () => {
      if (!email || !password || !confirmPassword)
        return alert("이메일과 비밀번호를 입력해주세요.");

      if (password !== confirmPassword)
        return alert("비밀번호가 일치하지 않습니다.");

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_API_URL}/api/signup/email`,
          data: {
            display_name: userName,
          },
        },
      });

      if (data) {
        setConfirmRequired(true);
      }

      if (error) {
        alert(error.message);
      }
    },
  });

  // 회원가입 OTP인증
  const otpMutation = useMutation({
    mutationFn: async () => {
      if (!otp) return alert("OTP를 입력해주세요!");

      const {
        data: { session },
        error,
      } = await supabase.auth.verifyOtp({
        type: "signup",
        email,
        token: otp,
      });

      if (session) route.push("/user");

      if (error) alert("인증번호가 일치하지 않습니다.");
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="pt-10 pb-6 px-10 w-full max-w-lg flex flex-col items-center justify-center border-black border gap-2">
        <h1 className="text-2xl font-bold">회원가입 페이지</h1>
        <div className="flex flex-col gap-2">
          {confirmRequired ? (
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6자리를 OTP를 입력해주세요."
              type="text"
            />
          ) : (
            <>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="이름"
                type="text"
              />
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
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호 확인"
                type="password"
              />
            </>
          )}
          {/* <Input
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
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 확인"
            type="password"
          /> */}
        </div>
        <button
          onClick={() => {
            if (confirmRequired) {
              otpMutation.mutate();
            } else {
              signUpMutation.mutate();
            }
          }}
          color="light-blue"
          className="w-full rounded-md py-1 border border-black"
          // disabled={
          //   confirmRequired ? otpMutation.isPending : signUpMutation.isPending
          // }
        >
          {confirmRequired ? "인증하기" : "가입하기"}
          {/* {signUpMutation.isPending ? "가입중..." : "가입하기"} */}
        </button>
      </div>

      <div className="py-4 w-full text-center max-w-lg border border-black bg-white">
        이미 계정이 있으신가요?
        <button
          className="text-light-blue-600 font-bold"
          onClick={() => setView("SIGNIN")}
        >
          로그인하기
        </button>
      </div>
    </div>
  );
};

export default SignUp;
