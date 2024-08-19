'use client';

import { XIcon } from '@/icons';
import { useSearchUsers } from '../../_provider/SearchUsersProvider';
import { memo } from 'react';
import { SearchCardContent, SearchCardThumbnail, SearchCardWrapper } from '../SearchMemberCard';

const SelectedUsers = () => {
  const { handleRemoveUser, selectedUsers } = useSearchUsers();

  return (
    <>
      <ul className="flex flex-wrap gap-[10px] px-4 mb-[2px] lg:gap-y-6 lg:mb-0 lg:p-0 lg:pt-3 lg:gap-0">
        {selectedUsers.map((user) => (
          <SearchCardWrapper key={user.id} onClick={() => handleRemoveUser(user)} className="w-auto px-0">
            <SearchCardContent>
              <div className="relative">
                <SearchCardThumbnail src={user.profile_image ?? undefined} className="mt-[6px] mr-[6px]" />
                <button
                  type="button"
                  onClick={() => handleRemoveUser(user)}
                  className="absolute z-[1] flex items-center justify-center bg-grey50 rounded-full w-[21px] h-[21px] top-0 right-0 lg:top-[2px] lg:right-[2px]"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            </SearchCardContent>
          </SearchCardWrapper>
        ))}
      </ul>
      {selectedUsers.length > 0 && <div className="lg:h-[1px] lg:bg-grey50 lg:my-8" />}
    </>
  );
};

const MemoizedSelectedUsers = memo(SelectedUsers);

export default MemoizedSelectedUsers;
