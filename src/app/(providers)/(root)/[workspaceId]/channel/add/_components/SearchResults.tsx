import { SearchWorkspaceUserType } from '@/types/workspaceUser';
import { useSearchUsers } from '../_provider/SearchUsersProvider';
import MemberCard from '@/components/MemberCard';
import { isEmpty } from '@/utils/isEmpty';
import Avatar from '@/components/Avatar';

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
          key={result.id}
          name={result.name}
          icon={<Avatar size="48px" src={result.profile_image ?? undefined} />}
          onToggle={() => handleSelectUser(result)}
          checked={selectedUsers.some((user) => user.id === result.id)}
        />
      ))}
    </>
  );
};

export default SearchResults;
