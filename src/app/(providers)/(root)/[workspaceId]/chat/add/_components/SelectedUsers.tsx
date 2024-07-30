import { SearchWorkspaceUserType } from '@/types/workspaceUser';
import { useSearchUsers } from '../_provider/SearchUsersProvider';

type SelectedUsersProps = {
  users: SearchWorkspaceUserType[];
};

const SelectedUsers = ({ users }: SelectedUsersProps) => {
  const { handleRemoveUser } = useSearchUsers();

  return (
    <div className="mt-4 flex flex-wrap">
      {users.map((user) => (
        <div key={user.id} className="flex items-center border-b py-2 relative">
          <img
            src={user.profile_image ?? 'https://blog.kakaocdn.net/dn/bCXLP7/btrQuNirLbt/N30EKpk07InXpbReKWzde1/img.png'}
            alt={user.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <button
            onClick={() => handleRemoveUser(user)}
            className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 text-red-500"
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectedUsers;
