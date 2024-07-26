'use client';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';

const ContactInfo = () => {
  const { workspaceUser } = useWorkspaceUser();
  const email = workspaceUser && workspaceUser.email;
  const phoneNum = workspaceUser && workspaceUser.phone;

  return (
    <div className="flex flex-col gap-4 mt-10">
      <h4 className="font-semibold text-sm">연락처 정보</h4>
      <div className="gap-2">
        <div className="text-sm">이메일 주소</div>
        <div className="text-sm">{email}</div>
      </div>
      <div className="gap-2">
        <div className="text-sm">전화</div>
        <div className="text-sm">{phoneNum}</div>
      </div>
    </div>
  );
};

export default ContactInfo;
