'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Typography from '@/components/Typography';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkEmail } from '../auth/_utils/emailCheck';
import { useSnackBar } from '@/providers/SnackBarContext';
import { useMutation } from '@tanstack/react-query';
import { TopBar } from '@/components/TopBar';
import WorkConnectWebTextLogo from '@/icons/WorkConnetWebText.svg';
import WorkConnectLogo from '@/icons/WorkConnectLogo.svg';
import { useVerifyCodeStore } from '@/store/verifyCode';
import { useResetPasswordEmail } from './_hooks/useResetPasswordEmail';

const PasswordFindPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();
  const { openSnackBar } = useSnackBar();
  const { setEmail } = useVerifyCodeStore();

  const { mutateAsync: resetPasswordEmailMutation, isPending: resetPasswordEmailPending } = useResetPasswordEmail({
    onError: (error: any) => {
      if (error.code === 'over_email_send_rate_limit') {
        return openSnackBar({ message: '60초 후에 인증 메일을 다시 보낼 수 있어요' });
      }
      return openSnackBar({ message: '예기치 못한 에러가 발생했어요' });
    }
  });

  const onSubmit = useMutation({
    mutationFn: async (email: string) => {
      const isDuplicateEmail = await checkEmail(email);

      if (!isDuplicateEmail) {
        return openSnackBar({ message: '가입된 이메일이 아니에요, 다시 한번 확인해주세요' });
      }

      await resetPasswordEmailMutation(email);

      setEmail(userEmail);
      openSnackBar({ message: '인증 메일이 발송되었어요' });
      return router.replace(`/password-find/verify?email=${encodeURIComponent(email)}`);
    }
  });

  const { mutateAsync: onSubmitMutation, isPending: onSubmitPending } = onSubmit;

  return (
    <main className="flex h-dvh">
      <div className="w-full hidden lg:flex justify-center items-center bg-[#FAFAFF] gap-[18px]">
        <WorkConnectLogo /> <WorkConnectWebTextLogo />
      </div>
      <div className="flex flex-col mx-4 w-full lg:mx-[151px]">
        <TopBar title="" style={{ padding: '0px' }} className="lg:hidden" />
        <div className="flex flex-col w-full h-dvh lg:justify-center">
          <Typography
            variant="Title20px"
            color="grey700Black"
            className="mt-[42px] mb-[18px] flex items-center lg:text-[36px] lg:mt-0"
          >
            비밀번호 찾기
          </Typography>
          <Typography variant="Subtitle16px" color="grey500" className="mb-7 lg:text-lg lg:block lg:mb-[42px]">
            워크커넥트에 가입했던 이메일을 입력해주세요
            <br />
            기존 비밀번호를 변경할 수 있도록 메일을 보내드려요
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitMutation(userEmail);
            }}
            className="flex flex-col gap-[24px]"
          >
            <div className="flex flex-col">
              <Typography as="label" variant="Subtitle14px" color="grey400" className="ml-[6px] mb-2">
                이메일 주소
              </Typography>
              <div className="flex flex-col gap-[42px]">
                <Input
                  type="email"
                  placeholder="asdf123@gmail.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <Button theme="primary" type="submit" isDisabled={onSubmitPending ? true : false} isFullWidth>
                  {onSubmitPending ? '발송중...' : '인증 메일 보내기'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
    // </div>
  );
};

export default PasswordFindPage;
