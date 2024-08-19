'use client';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { checkEmail, emailRegex } from '../_utils/emailCheck';
import { useSnackBar } from '@/providers/SnackBarContext';
import AgreeBottomSheet from './_components/AgreeBottomSheet';
import { TopBar } from '@/components/TopBar';
import { validatePassword } from './verify/_utils/validatePassword';
import Typography from '@/components/Typography';
import WorkConnectWebTextLogo from '@/icons/WorkConnetWebText.svg';
import WorkConnectLogo from '@/icons/WorkConnectLogo.svg';
import { useSignUp } from './_hooks/useSignup';
import Input from '@/components/Input';

const SignUpPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailCheck, setEmailCheck] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const { openSnackBar } = useSnackBar();

  const { mutateAsync: handleSignUpMutation, isPending: signUpIsPending } = useSignUp({
    onSuccess: () => {
      setEmailCheck(false);
      handleToggleBottomSheet();
    },
    onError: () => {
      openSnackBar({ message: '에러가 발생했어요' });
    }
  });

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordValidationMessage = validatePassword(password);
    if (!emailCheck) return openSnackBar({ message: '이메일 중복확인을 해주세요' });
    if (password !== passwordCheck) return openSnackBar({ message: '비밀번호가 일치하지 않아요' });
    if (passwordValidationMessage !== true) return openSnackBar({ message: passwordValidationMessage });

    handleSignUpMutation({ email, password, name });
  };

  const emailCheckMutation = useMutation({
    mutationFn: async (email: string) => {
      if (!emailRegex(email)) {
        setEmailCheck(false);
        openSnackBar({ message: '이메일 형식이 올바르지 않아요' });
        return;
      }

      const isDuplicateEmail = await checkEmail(email);
      if (!isDuplicateEmail) return setEmailCheck(true);
      if (isDuplicateEmail) {
        setEmailCheck(false);
        return openSnackBar({ message: '이미 존재하는 이메일이에요' });
      }
    }
  });

  const handleToggleBottomSheet = () => {
    setIsOpen((prev) => !prev);
  };

  const { mutateAsync: handleEmailCheck } = emailCheckMutation;

  return (
    <main className="flex h-dvh">
      <div className="hidden lg:w-[42%] lg:flex lg:justify-center lg:items-center lg:bg-[#FAFAFF] lg:gap-[18px]">
        <WorkConnectLogo /> <WorkConnectWebTextLogo />
      </div>
      <div className="flex flex-col mx-4 w-full lg:w-[58%] lg:justify-center lg:items-center">
        <TopBar title="" className="lg:hidden" style={{ padding: '0px' }} />
        <form onSubmit={handleSignUp} className="lg:w-[550px]">
          <div className="flex-grow break-keep">
            <Typography
              variant="Title20px"
              color="grey700Black"
              className="mt-[42px] mb-[18px] flex items-center lg:mt-0 lg:text-[36px]"
            >
              회원가입
            </Typography>
            <Typography variant="Subtitle18px" color="grey500" className="hidden lg:block mb-[42px] ">
              Work Connect를 활용하여 업무의 효율을 높이세요
            </Typography>
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col">
                <label className="text-[14px] text-[#2F323C] pl-[6px] mb-2" htmlFor="name">
                  이름
                </label>
                <input
                  className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-[0_1px_5px_0_rgba(0,0,0,0.12)] focus:outline-none"
                  type="text"
                  id="name"
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] text-[#2F323C] pl-[6px] mb-2" htmlFor="email">
                  이메일 입력
                </label>
                <div className="flex gap-[12px]">
                  <input
                    className="w-[70%] py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
                    type="email"
                    id="email"
                    placeholder="asdf123@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                  />
                  <button
                    type="button"
                    onClick={() => handleEmailCheck(email)}
                    disabled={emailCheckMutation.isPending ? true : false}
                    className="w-full text-sm py-[12px] bg-[#7173FA] text-white rounded-lg shadow-md flex-1"
                  >
                    {emailCheckMutation.isPending ? '확인중...' : '중복확인'}
                  </button>
                </div>
                {emailCheck ? <p className="text-[14px] text-[#6C6C6C] pt-2">사용 가능한 이메일 입니다</p> : null}
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] text-[#2F323C] pl-[6px] mb-2" htmlFor="password">
                  비밀번호
                </label>
                <Input
                  value={password}
                  type="password"
                  id="password"
                  placeholder="비밀번호 입력"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-[14px] text-[#ACB1BE] pl-[6px] mt-2">영문자 및 숫자 조합으로 8자 이내 입력</p>
              </div>
              <div className="flex flex-col pb-[32px]">
                <label className="text-[14px] text-[#2F323C] pl-[6px] mb-2" htmlFor="passwordCheck">
                  비밀번호 재입력
                </label>
                <Input
                  value={passwordCheck}
                  type="password"
                  id="passwordCheck"
                  placeholder="비밀번호 재입력"
                  onChange={(e) => setPasswordCheck(e.target.value)}
                />
                <p className="text-[14px] text-[#ACB1BE]  pl-[6px] mt-2">영문자 및 숫자 조합으로 8자 이내 입력</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center pb-4 sticky bottom-0 bg-white">
            <button
              className="w-full text-lg py-[12px] px-[22px] bg-[#7173FA] text-white rounded-lg shadow-md"
              disabled={signUpIsPending ? true : false}
            >
              인증 메일 발송
            </button>
          </div>
        </form>
      </div>
      <AgreeBottomSheet isOpen={isOpen} handleToggleBottomSheet={handleToggleBottomSheet} email={email} />
    </main>
  );
};

export default SignUpPage;
