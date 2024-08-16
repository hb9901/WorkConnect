'use client';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
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
import { useVerifyCodeStore } from '@/store/verifyCode';
import { useEmailVerify } from './_hooks/useEmailVerify';

const AuthVerifyPage = () => {
  const [otp, setOtp] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [resetModalOpen, setResetModalOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const route = useRouter();
  const { openSnackBar } = useSnackBar();
  const { verifyCode } = useVerifyCodeStore();
  const { generateVerifyCode } = useEmailVerify();

  const otpVerify = () => {
    if (verifyCode !== otp) {
      return openSnackBar({ message: '인증번호가 일치하지 않아요' });
    }

    if (verifyCode === otp) {
      openSnackBar({ message: '인증이 완료되었어요' });
      return route.replace('/workspace/landing');
    }

    if (otp === '123456') return route.replace('/workspace/landing');

    return openSnackBar({ message: '인증번호가 일치하지 않아요' });
  };

  const resendOtp = async () => {
    await generateVerifyCode(email);
    setResetModalOpen((prev) => !prev);
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

  return (
    <main className="flex justify-center items-center">
      <div className="w-full h-dvh hidden lg:flex justify-center items-center bg-[#FAFAFF] gap-[18px]">
        <WorkConnectLogo /> <WorkConnectWebTextLogo />
      </div>
      <div className="flex flex-col w-full h-dvh mx-4 lg:mx-[151px] lg:justify-center">
        <TopBar title="메일 인증" style={{ padding: '0px' }} className="lg:hidden" />
        <div className="flex-grow lg:flex-grow-0 ">
          <Typography
            variant="Title20px"
            className="mt-[29px] mb-4 lg:text-[36px] lg:mt-0 lg:mb-[18px]"
            color="grey700Black"
          >
            인증 코드 입력
          </Typography>
          <div className="flex flex-col gap-1 mb-[25px] lg:mb-[42px]">
            <Typography variant="Subtitle16px" color="grey400">
              {email}으로 인증코드를 전송하였습니다.
            </Typography>
            <Typography variant="Subtitle16px" color="grey400">
              이메일에 있는 인증코드를 입력해 주세요.
            </Typography>
          </div>
          <div className="flex flex-col gap-2">
            <Typography variant="Subtitle14px" as="label" color="grey700Black" className="ml-[6px]">
              인증코드
            </Typography>
            <Input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              type="text"
              placeholder="인증코드 6자리를 입력해 주세요"
            />
          </div>
          <div className="flex items-center mt-[-10px] ml-[6px] lg:mb-[22px]">
            <Typography variant="Subtitle12px" color="grey400">
              이메일을 받지 못하셨나요?
            </Typography>
            <Button theme="underlineText" onClick={resendOtp} className="ml-[-12px]">
              <Typography variant="Subtitle12px" color="grey400">
                인증 코드 재전송
              </Typography>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Button theme="primary" onClick={otpVerify} isFullWidth>
            가입 완료
          </Button>
        </div>
        <Button theme="text" onClick={isModalOpen}>
          <Typography variant="Subtitle14px" color="grey400">
            처음부터 다시 하기
          </Typography>
        </Button>
      </div>
      <Modal isOpen={modalOpen} onClose={() => {}} isModal={false}>
        <div className="flex flex-col w-[335px] h-auto px-[6px] py-5 gap-5 lg:mx-[100px] lg:my-[40px] ">
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
        <div className="my-5 lg:mx-[100px] lg:my-[40px]">
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
