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
import Input from '@/components/Input';
import WorkConnectWebTextLogo from '@/icons/WorkConnetWebText.svg';
import WorkConnectLogo from '@/icons/WorkConnectLogo.svg';
import DangerIcon from '@/icons/DialogDanger.svg';
import SuccessIcon from '@/icons/DialogSuccess.svg';

const AuthVerifyPage = () => {
  const [otp, setOtp] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [resetModalOpen, setResetModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const route = useRouter();
  const { openSnackBar } = useSnackBar();

  // TODO : 리팩터링 예정
  const otpMutation = useMutation({
    mutationFn: async () => {
      // const { data, error } = await supabase.auth.verifyOtp({
      //   type: 'signup',
      //   email,
      //   token: fullOtp
      // });

      // if (error) return openSnackBar({ message: '인증번호가 일치하지 않아요' });
      if (otp === '123456') return route.replace('/workspace/landing');
      return openSnackBar({ message: '인증번호가 일치하지 않아요' });

      // TODO : 처음 회원가입 시에는 /workspace/landing페이지
      // if (data) return route.push('/workspace/landing');
    }
  });

  // TODO : 수정작업 (MVP이후 작업 피드백)
  const resendOtp = async () => {
    // const { data, error } = await supabase.auth.resend({
    //   type: 'signup',
    //   email,
    //   options: {
    //     emailRedirectTo: `${process.env.NEXT_PUBLIC_API_URL}/api/signup/email`
    //   }
    // });
    // if (error) return openSnackBar({ message: '에러가 발생했어요' });
    // if (data) return openSnackBar({ message: '인증번호가 재전송되었어요' });
    setResetModalOpen((prev) => !prev);
    // openSnackBar({ message: '인증번호가 재전송되었어요' });
  };

  const isModalOpen = () => {
    setModalOpen((prev) => !prev);
  };

  const isResetModalOpen = () => {
    setResetModalOpen((prev) => !prev);
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

  // TODO: 모달 분리하기
  return (
    <main className="flex justify-center items-center">
      <div className="w-full h-dvh hidden lg:flex justify-center items-center bg-[#FAFAFF] gap-[18px]">
        <WorkConnectLogo /> <WorkConnectWebTextLogo />
      </div>
      <div className="flex flex-col w-full h-dvh mx-4 lg:mx-[151px] lg:justify-center">
        <TopBar title="메일 인증" style={{ padding: '0px' }} className="lg:hidden" />
        <div className="flex-grow lg:flex-grow-0 ">
          <Typography variant="Title20px" className="lg:text-[36px] lg:mb-[18px]" color="grey700Black">
            인증 코드 입력
          </Typography>
          <div className="flex flex-col gap-[12px] mb-[12px] text-[16px] text-[#5C6275] lg:mb-[42px]">
            <p>{email}으로 인증코드를 전송하였습니다.</p>
            <p>이메일에 있는 인증코드를 입력해 주세요.</p>
          </div>
          <div className="flex flex-col mb-[13px] gap-2 lg:mb-4">
            <Typography variant="Subtitle14px" as="label" color="grey700Black">
              인증코드
            </Typography>
            <Input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              type="text"
              placeholder="인증코드 6자리를 입력해 주세요"
            />
          </div>
          <div className="text-[12px] text-[#464A59] flex items-center lg:mb-[42px]">
            <span className="mr-[10px]">이메일을 받지 못하셨나요?</span>
            <button onClick={isResetModalOpen} className="underline">
              인증 코드 재전송
            </button>
          </div>
        </div>
        <div className="flex justify-center lg:mb-[18px]">
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
      <Modal isOpen={modalOpen} onClose={() => {}} isModal={false}>
        <div className="flex flex-col w-[335px] h-auto px-[6px] py-5 gap-5 lg:mx-[127px] lg:my-[50px] ">
          <div className="flex flex-col items-center gap-2">
            <DangerIcon className="mb-[22px] hidden lg:flex" />
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
      <Modal isOpen={resetModalOpen} onClose={isResetModalOpen} isModal={false}>
        <div className="my-5 lg:mx-[127px] lg:my-[40px]">
          <div className="mx-4 mb-[20px] flex flex-col items-center gap-2">
            <SuccessIcon className="hidden lg:flex mb-[22px]" />
            <Typography variant="Title18px" color="grey700Black">
              이메일 인증코드 재전송 완료
            </Typography>
            <Typography variant="Title16px" color="grey400">
              {email}으로 인증코드를 재전송 하였습니다.
            </Typography>
          </div>
          <Button theme="primary" isFullWidth={true} children="확인" onClick={isResetModalOpen} />
        </div>
      </Modal>
    </main>
  );
};

export default AuthVerifyPage;
