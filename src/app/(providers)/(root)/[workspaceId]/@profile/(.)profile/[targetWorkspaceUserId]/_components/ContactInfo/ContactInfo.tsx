import BriefcaseIcon from '@/icons/Briefcase.svg';
import LockIcon from '@/icons/Lock.svg';
import MailIcon from '@/icons/Mail.svg';
import PhoneIcon from '@/icons/Phone.svg';
import InfoForm from '../InfoForm';

interface ContactInfoProps {
  isMyPage: boolean;
  isOpen: boolean;
  state: string | null;
  email: string | null;
  phoneNum: string | null;
}

const ContactInfo = ({ isMyPage, isOpen, state, email, phoneNum }: ContactInfoProps) => {
  return (
    <div className="flex flex-col gap-[20px] mt-[42px]">
      <InfoForm title="활동 상태" content={state ? state : '-'}>
        <BriefcaseIcon className="w-[20px] h-[20px]" />
      </InfoForm>
      <InfoForm title="이메일 주소" content={isOpen && email ? email : '-'}>
        <MailIcon />
      </InfoForm>
      <InfoForm title="휴대폰 번호" content={isOpen && phoneNum ? phoneNum : '-'}>
        <PhoneIcon />
      </InfoForm>

      {isMyPage && (
        <InfoForm title="내 정보" content={isOpen ? '공개' : '비공개'}>
          <LockIcon />
        </InfoForm>
      )}
    </div>
  );
};

export default ContactInfo;
