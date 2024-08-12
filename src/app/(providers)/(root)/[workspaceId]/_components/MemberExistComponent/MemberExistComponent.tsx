'use client';
import ResponsiveTypography from '@/components/ResponsiveTypography';
import { Tables } from '@/types/supabase';
import { useState } from 'react';
import InviteCardWithMembers from '../InviteCardWithMembers';
import MemberCard from '../MemberCard';

interface MemberExistComponentProps {
  workspaceUserList: Tables<'workspace_user'>[];
}

const MemberExistComponent = ({ workspaceUserList }: MemberExistComponentProps) => {
  const [isCardExist, setIsCardExist] = useState<Boolean>(true);

  const handleCardClose = () => {
    setIsCardExist(false);
  };

  return (
    <>
      {isCardExist && (
        <div className="mt-[42px]">
          <InviteCardWithMembers handleCardClose={handleCardClose} />
        </div>
      )}
      <div className="mt-[42px] mb-[24px]">
        <ResponsiveTypography mobileVariant="Title18px" pcVariant="Title22px" color="grey700Black">
          멤버목록
        </ResponsiveTypography>
        <div>
          {workspaceUserList.map((workspaceUser) => (
            <MemberCard key={workspaceUser.id} workspaceUser={workspaceUser} />
          ))}
        </div>
      </div>
    </>
  );
};
export default MemberExistComponent;
