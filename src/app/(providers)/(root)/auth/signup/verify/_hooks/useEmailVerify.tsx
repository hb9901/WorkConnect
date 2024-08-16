import { getRandomNumbers } from '@/app/(providers)/(root)/workspace/new/_utils/randomNumbers';
import { sendContactEmail } from '../_utils/contact';
import { useVerifyCodeStore } from '@/store/verifyCode';

export const useEmailVerify = () => {
  const { setVerifyCode } = useVerifyCodeStore();

  const generateVerifyCode = async (email: string) => {
    const newVerifyCode = getRandomNumbers(6, 1, 9).join('');
    await sendContactEmail({ otp: newVerifyCode, userEmail: email });
    setVerifyCode(newVerifyCode);
  };

  return { generateVerifyCode };
};
