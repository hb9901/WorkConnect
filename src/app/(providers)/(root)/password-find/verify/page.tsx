import Typography from '@/components/Typography';
import EmailLogo from '@/icons/Email.svg';
import UserEmail from './_components/UserEmail';

const PasswordVerifyPage = () => {
  return (
    <main className="flex flex-col w-full h-dvh bg-[#FAFAFF] justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-[24px]">
        <EmailLogo className="w-[83px] h-[87px] lg:w-[116px] lg:h-[122px]" />
        <div className="flex flex-col justify-center items-center gap-[12px] text-center">
          <UserEmail />
          <Typography variant="Subtitle16px" color="grey400" className="lg:text-[18px]">
            인증 메일이 발송되었어요
            <br />
            이메일을 확인해주세요
          </Typography>
        </div>
      </div>
    </main>
  );
};

export default PasswordVerifyPage;
