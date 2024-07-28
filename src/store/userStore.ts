import { create } from 'zustand';

type UserDataType = {
  userId: string | null;
  workspaceUserId: string | null;
  setUserData: (userId: string, workspaceUserId: string) => void;
};

const useUserStore = create<UserDataType>((set) => ({
  userId: null,
  workspaceUserId: null,
  setUserData: (userId: string, workspaceUserId: string) => set({ userId, workspaceUserId })
}));

export default useUserStore;
