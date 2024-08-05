'use client';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { useSnackBar } from '@/providers/SnackBarContext';
import { TopBar } from '@/components/TopBar';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import Typography from '@/components/Typography';

const AuthVerifyPage = () => {
  const [otp1, setOtp1] = useState<string>('');
  const [otp2, setOtp2] = useState<string>('');
  const [otp3, setOtp3] = useState<string>('');
  const [otp4, setOtp4] = useState<string>('');
  const [otp5, setOtp5] = useState<string>('');
  const [otp6, setOtp6] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const route = useRouter();
  const { openSnackBar } = useSnackBar();
  const getFullOtp = (): string => {
    return otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
  };

  // TODO : 리팩터링 예정
  const otpMutation = useMutation({
    mutationFn: async () => {
      const fullOtp = getFullOtp();

      const { data, error } = await supabase.auth.verifyOtp({
        type: 'signup',
        email,
        token: fullOtp
      });

      if (error) return openSnackBar({ message: '인증번호가 일치하지 않아요' });

      // TODO : 처음 회원가입 시에는 /workspace/landing페이지
      if (data) return route.push('/workspace/landing');
    }
  });

  // TODO : 수정작업 (MVP이후 작업 피드백)
  const resendOtp = async () => {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_API_URL}/api/signup/email`
      }
    });

    if (error) return openSnackBar({ message: '에러가 발생했어요' });
    if (data) return openSnackBar({ message: '인증번호가 재전송되었어요' });
  };

  const isModalOpen = () => {
    setModalOpen((prev) => !prev);
  };

  const resetToStart = async () => {
    await supabase.auth.signOut();
    isModalOpen();
    return route.push('/');
  };

  const { mutate: otpMutate } = otpMutation;

  useLayoutEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const emailFromQuery = query.get('email');
    setEmail(emailFromQuery || '');
  }, []);

  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-dvh px-4">
        <TopBar title="메일 인증" style={{ padding: '0px' }} />
        <Modal isOpen={modalOpen} onClose={() => {}} isModal={false}>
          <div className="flex flex-col w-[335px] h-auto px-[6px] py-5 gap-5">
            <div className="flex flex-col items-center gap-2">
              <Typography variant="Title18px" color="grey700Black">
                처음부터 다시 하시겠어요?
              </Typography>
              <Typography variant="Subtitle16px" color="grey400">
                지금까지 입력하신 정보가 모두 사라져요
              </Typography>
            </div>
            <div className="flex gap-2">
              <Button theme="grey" isFullWidth={true} children="취소" onClick={isModalOpen} />
              <Button theme="primary" isFullWidth={true} children="처음으로" onClick={resetToStart} />
            </div>
          </div>
        </Modal>
        <div className="flex-grow">
          <h1 className="text-[20px] text-[#2F323C] font-semibold mt-[32px] mb-[16px] flex items-center">
            인증 코드 입력
          </h1>
          <div className="flex flex-col gap-[12px] mb-[12px] text-[16px] text-[#5C6275]">
            <p>{email}으로 인증코드를 전송하였습니다.</p>
            <p>이메일에 있는 인증코드를 입력해 주세요.</p>
          </div>
          <div className="flex justify-between gap-2 mb-4">
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
          <div className="text-[12px] text-[#464A59] flex items-center">
            <span className="mr-[10px]">이메일을 받지 못하셨나요?</span>
            <button onClick={resendOtp} className="underline">
              인증 코드 재전송
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => otpMutate()}
            className="w-full text-lg py-[12px] px-[22px] bg-[#7173FA] text-white rounded-lg shadow-md"
          >
            가입 완료
          </button>
        </div>
        <div className="text-[#2F323C] text-center text-[14px] my-3">
          <button onClick={isModalOpen}>처음부터 다시 하기</button>
        </div>
      </div>
    </main>
  );
};

export default AuthVerifyPage;
