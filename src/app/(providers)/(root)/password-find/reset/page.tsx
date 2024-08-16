'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Typography from '@/components/Typography';
import { useSnackBar } from '@/providers/SnackBarContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TopBar } from '@/components/TopBar';
import WorkConnectWebTextLogo from '@/icons/WorkConnetWebText.svg';
import WorkConnectLogo from '@/icons/WorkConnectLogo.svg';
import { useMutation } from '@tanstack/react-query';
import { validatePassword } from '../../auth/signup/verify/_utils/validatePassword';
import { useUpdatePassword } from '../_hooks/useResetPasswordEmail';

const PasswordResetPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();
  const { openSnackBar } = useSnackBar();

  const { mutateAsync: updatePasswordMutation } = useUpdatePassword({
    onError: (error: any) => {
      if (error.code === 'same_password') {
        openSnackBar({ message: '기존 비밀번호와 동일해요' });
        return;
      }
      return openSnackBar({ message: '비밀번호 변경에 실패했어요' });
    },
    onSuccess: () => {
      openSnackBar({ message: '비밀번호가 변경되었어요' });
      router.replace('/');
    }
  });

  const handlePasswordReset = useMutation({
    mutationFn: async (newPassword: string) => {
      const passwordValidationMessage = validatePassword(newPassword);
      if (passwordValidationMessage !== true) return openSnackBar({ message: passwordValidationMessage });

      await updatePasswordMutation(newPassword);
    }
  });

  const { mutateAsync: passwordResetMutation, isPending: passwordResetPending } = handlePasswordReset;

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
            비밀번호 재설정
          </Typography>
          <Typography variant="Subtitle16px" color="grey500" className="mb-7 lg:text-lg lg:block lg:mb-[42px]">
            변경할 비밀번호를 입력해주세요
          </Typography>
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col">
              <Typography as="label" variant="Subtitle14px" color="grey400" className="ml-[6px] mb-2">
                비밀번호 입력
              </Typography>
              <form
                className="flex flex-col"
                onSubmit={(e) => {
                  e.preventDefault();
                  passwordResetMutation(newPassword);
                }}
              >
                <Input
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Typography as="p" variant="Subtitle14px" color="grey400" className="ml-[6px] mt-2 mb-[42px]">
                  영문자 및 숫자 조합으로 8자 이내 입력
                </Typography>
                <Button theme="primary" type="submit" isDisabled={passwordResetPending ? true : false} isFullWidth>
                  변경하기
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PasswordResetPage;
