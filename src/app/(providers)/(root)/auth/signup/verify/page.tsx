'use client';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { deleteUserById, deleteWorkUserById } from '../../_utils/supabase';
import BackButton from '../../_components/BackButton';

const AuthVerifyPage = () => {
  const [otp1, setOtp1] = useState<string>('');
  const [otp2, setOtp2] = useState<string>('');
  const [otp3, setOtp3] = useState<string>('');
  const [otp4, setOtp4] = useState<string>('');
  const [otp5, setOtp5] = useState<string>('');
  const [otp6, setOtp6] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const route = useRouter();

  console.log(name);
  console.log(email);
  console.log(password);

  const getFullOtp = (): string => {
    return otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
  };

  const otpMutation = useMutation({
    mutationFn: async () => {
      const fullOtp = getFullOtp();
      // if (fullOtp === '123456') return route.push('/auth/invitecode');
      // return alert('인증번호가 일치하지 않습니다.');

      const { data, error } = await supabase.auth.verifyOtp({
        type: 'signup',
        email,
        token: fullOtp
      });

      if (error) return alert('인증번호가 일치하지 않습니다.');

      if (data) return route.push('/user');
    }
  });

  // OTP 재전송
  const resendOtp = async () => {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_API_URL}/api/signup/email`
      }
    });

    if (error) return alert(`인증번호 재전송 중 에러가 발생하였습니다. : ${error.message}`);
    if (data) return alert('인증번호가 재전송되었습니다.');
  };

  const resetToStart = async () => {
    const reset = confirm(`처음부터 다시하시겠습니까?\n입력하신 정보가 삭제되며, 복구가 어렵습니다.`);

    if (reset) {
      const { error } = await supabase.auth.signOut();
      await deleteWorkUserById(email);
      await deleteUserById(email);
      if (error) return alert(`세션 제거중 에러가 발생하였습니다. : ${error.message}`);

      return route.push('/auth/signup');
    }
  };

  const { mutate: otpMutate } = otpMutation;

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const emailFromQuery = query.get('email');
    setEmail(emailFromQuery || '');
  }, []);

  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-dvh px-4">
        <div className="flex w-[375px] h-[52px] pt-[14px] pb-[12px] items-center">
          <BackButton />
        </div>
        <div className="flex-grow">
          <h1 className="text-[20px] text-[#2E2E2E] font-semibold pt-[42px] pb-[28px] flex items-center">
            인증 코드 입력
          </h1>
          <p className="text-[16px] text-[#333] font-normal pb-[12px]">
            이메일로 전송된 6자리 인증 코드를 입력 후 [가입 완료] 버튼을 클릭해주세요.
          </p>
          <div className="flex justify-between gap-2">
            <input
              type="text"
              maxLength={1}
              onChange={(e) => setOtp1(e.target.value)}
              className="border-[1px] border-[#333] rounded-lg text-center flex-grow w-full h-16 text-lg"
            />
            <input
              type="text"
              maxLength={1}
              onChange={(e) => setOtp2(e.target.value)}
              className="border-[1px] border-[#333] rounded-lg text-center flex-grow w-full h-16 text-lg"
            />
            <input
              type="text"
              maxLength={1}
              onChange={(e) => setOtp3(e.target.value)}
              className="border-[1px] border-[#333] rounded-lg text-center flex-grow w-full h-16 text-lg"
            />
            <input
              type="text"
              maxLength={1}
              onChange={(e) => setOtp4(e.target.value)}
              className="border-[1px] border-[#333] rounded-lg text-center flex-grow w-full h-16 text-lg"
            />
            <input
              type="text"
              maxLength={1}
              onChange={(e) => setOtp5(e.target.value)}
              className="border-[1px] border-[#333] rounded-lg text-center flex-grow w-full h-16 text-lg"
            />
            <input
              type="text"
              maxLength={1}
              onChange={(e) => setOtp6(e.target.value)}
              className="border-[1px] border-[#333] rounded-lg text-center flex-grow w-full h-16 text-lg"
            />
          </div>
          <button onClick={resendOtp} className="text-[12px] text-[#333] font-normal underline pb-7 mt-4">
            인증번호 재전송
          </button>
        </div>
        <div className="flex justify-center pb-4">
          <button
            onClick={() => otpMutate()}
            className="w-full text-lg py-[12px] px-[22px] bg-[#333] text-white rounded-lg shadow-md"
          >
            가입 완료
          </button>
        </div>
        <button onClick={resetToStart} className="text-[#333] text-center text-[12px] font-normal underline pb-7">
          처음부터 다시 하기
        </button>
      </div>
    </main>
  );
};

export default AuthVerifyPage;
