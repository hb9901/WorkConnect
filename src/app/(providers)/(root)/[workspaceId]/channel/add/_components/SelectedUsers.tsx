import { SearchWorkspaceUserType } from '@/types/workspaceUser';
import { useSearchUsers } from '../_provider/SearchUsersProvider';
import { XIcon } from '@/icons';
import Avatar from '@/components/Avatar';

type SelectedUsersProps = {
  users: SearchWorkspaceUserType[];
};

const SelectedUsers = ({ users }: SelectedUsersProps) => {
  const { handleRemoveUser } = useSearchUsers();

  return (
    <div className="flex flex-wrap gap-x-[10px] px-4 mb-[2px]">
      {users.map((user) => (
        <div key={user.id} className="flex items-center ml-[-6px] relative p-[6px]">
          <Avatar size="48px" src={user.profile_image ?? undefined} />
          <button
            type="button"
            onClick={() => handleRemoveUser(user)}
            className="absolute top-0 right-0 z-10 flex items-center justify-center bg-grey50 rounded-full w-[21px] h-[21px]"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectedUsers;
