import { SearchWorkspaceUserType } from '@/types/workspaceUser';
import { useSearchUsers } from '../_provider/SearchUsersProvider';
import MemberCard from '@/components/MemberCard';
import Image from 'next/image';
import { isEmpty } from '@/utils/isEmpty';

type SearchResultsProps = {
  searchUsers: SearchWorkspaceUserType[];
  selectedUsers: SearchWorkspaceUserType[];
};

const SearchResults = ({ searchUsers, selectedUsers }: SearchResultsProps) => {
  const { handleSelectUser } = useSearchUsers();

  if (isEmpty(searchUsers)) {
    return <div className="text-gray-500 text-center">검색 결과가 없습니다.</div>;
  }

  return (
    <>
      {searchUsers.map((result) => (
        <MemberCard
          name={result.name}
          icon={
            <Image
              src={
                result.profile_image ?? 'https://blog.kakaocdn.net/dn/bCXLP7/btrQuNirLbt/N30EKpk07InXpbReKWzde1/img.png'
              }
              alt={result.name}
              width={48}
              height={48}
              className="w-[48px] h-[48px] rounded-full object-cover"
              unoptimized
            />
          }
          onToggle={() => handleSelectUser(result)}
          checked={selectedUsers.some((user) => user.id === result.id)}
        />
      ))}
    </>
  );
};

export default SearchResults;
