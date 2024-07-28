import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserDataType = {
  userId: string | null;
  workspaceUserId: number | null;
  setUserData: (userId: string, workspaceUserId: number) => void;
  clearStore: () => void;
};

const useUserStore = create<UserDataType>()(
  persist<UserDataType>(
    (set, _, api) => ({
      userId: null,
      workspaceUserId: null,
      setUserData: (userId: string, workspaceUserId: number) => set({ userId, workspaceUserId }),
      clearStore: () => {
        api.persist.clearStorage();
      }
    }),
    {
      name: 'user-storage'
    }
  )
);

export default useUserStore;
