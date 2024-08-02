import useUserStore from '@/store/userStore';

export const useWorkspaceUserId = () => {
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);
  return workspaceUserId || '';
};
