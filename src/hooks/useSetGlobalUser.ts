import useUserStore from '@/store/userStore';
import { setUserIdCookie, setWorkspaceIdCookie, setWorkspaceUserIdCookie } from '@/utils/cookie/workspace';

type SetGlobalUserProps = { userId: string; workspaceId: number; workspaceUserId?: string };

const useSetGlobalUser = () => {
  const setUserData = useUserStore((state) => state.setUserData);

  const handleSetGlobalUser = ({ userId, workspaceId, workspaceUserId }: SetGlobalUserProps) => {
    setUserData(userId, workspaceId);
    setWorkspaceIdCookie(workspaceId);
    setUserIdCookie(userId);

    if (workspaceUserId) {
      setWorkspaceUserIdCookie(workspaceUserId);
    }
  };

  return { handleSetGlobalUser };
};

export default useSetGlobalUser;
