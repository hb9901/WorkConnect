import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserDataType = {
  userId: string | null;
  workspaceId: number | null;
  setUserData: (userId: string, workspaceId: number) => void;
  clearStore: () => void;
};

const useUserStore = create<UserDataType>()(
  persist<UserDataType>(
    (set, _, api) => ({
      userId: null,
      workspaceId: null,
      setUserData: (userId: string, workspaceId: number) => set({ userId, workspaceId }),
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
