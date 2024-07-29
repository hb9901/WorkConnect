'use client';
import Typography from '@/components/Typography';
import { useState } from 'react';
import InviteCardWithMembers from '../InviteCardWithMembers';

const MemberNotExistComponent = () => {
  const [isCardExist, setIsCardExist] = useState<Boolean>(true);

  const handleCardClose = () => {
    setIsCardExist(false);
  };

  return (
    <>
      {isCardExist && (
        <>
          <div className="mt-[42px]">
            <InviteCardWithMembers handleCardClose={handleCardClose} />
          </div>
          <div className="mt-[42px] mb-[24px]">
            <Typography variant="Title18px" color="grey700Black">
              멤버목록
            </Typography>
          </div>
        </>
      )}
    </>
  );
};

export default MemberNotExistComponent;
