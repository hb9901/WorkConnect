import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserDataType = {
  userId: string | null;
  workspaceUserId: number | null;
  setUserData: (userId: string, workspaceUserId: number) => void;
};

const useUserStore = create<UserDataType>()(
  persist(
    (set) => ({
      userId: null,
      workspaceUserId: null,
      setUserData: (userId: string, workspaceUserId: number) => set({ userId, workspaceUserId })
    }),
    {
      name: 'user-storage'
    }
  )
);

export default useUserStore;
