import { SearchWorkspaceUserType } from '@/types/workspaceUser';
import { useSearchUsers } from '../_provider/SearchUsersProvider';
import Image from 'next/image';
import { XIcon } from '@/icons';

type SelectedUsersProps = {
  users: SearchWorkspaceUserType[];
};

const SelectedUsers = ({ users }: SelectedUsersProps) => {
  const { handleRemoveUser } = useSearchUsers();

  return (
    <div className="flex flex-wrap gap-x-[10px] px-4 mb-[2px]">
      {users.map((user) => (
        <div key={user.id} className="flex items-center ml-[-6px] relative p-[6px]">
          <Image
            src={user.profile_image ?? 'https://blog.kakaocdn.net/dn/bCXLP7/btrQuNirLbt/N30EKpk07InXpbReKWzde1/img.png'}
            alt={user.name}
            width={48}
            height={48}
            className="w-[48px] h-[48px] rounded-full object-cover"
            unoptimized
          />
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
