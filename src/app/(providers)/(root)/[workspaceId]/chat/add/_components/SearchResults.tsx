import { SearchWorkspaceUserType } from '@/types/workspaceUser';
import { useSearchUsers } from '../_provider/SearchUsersProvider';

type SearchResultsProps = {
  users: SearchWorkspaceUserType[];
};

const SearchResults = ({ users }: SearchResultsProps) => {
  const { handleSelectUser } = useSearchUsers();

  if (users.length === 0) {
    return <div className="text-gray-500">검색 결과가 없습니다.</div>;
  }

  return (
    <>
      {users.map((result) => (
        <div key={result.id} className="flex items-center border-b py-2" onClick={() => handleSelectUser(result)}>
          <img
            src={
              result.profile_image ?? 'https://blog.kakaocdn.net/dn/bCXLP7/btrQuNirLbt/N30EKpk07InXpbReKWzde1/img.png'
            }
            alt={result.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="text-lg">{result.name}</div>
        </div>
      ))}
    </>
  );
};

export default SearchResults;
