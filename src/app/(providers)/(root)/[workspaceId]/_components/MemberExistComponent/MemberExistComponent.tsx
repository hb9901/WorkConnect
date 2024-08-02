'use client';
import Typography from '@/components/Typography';
import useUserStore from '@/store/userStore';
import { Tables } from '@/types/supabase';
import { useState } from 'react';
import AvatarCard from '../AvatarCard';
import InviteCardWithMembers from '../InviteCardWithMembers';

interface MemberExistComponentProps {
  workspaceUserList: Tables<'workspace_user'>[];
}

const MemberExistComponent = ({ workspaceUserList }: MemberExistComponentProps) => {
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);
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
        <Typography variant="Title18px" color="grey700Black">
          멤버목록
        </Typography>
        <div>
          {workspaceUserList &&
            workspaceUserList.map(
              (workspaceUser) =>
                workspaceUserId !== workspaceUser.id && (
                  <AvatarCard key={workspaceUser.id} workspaceUser={workspaceUser} />
                )
            )}
        </div>
      </div>
    </>
  );
};
export default MemberExistComponent;
