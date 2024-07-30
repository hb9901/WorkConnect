import { TWorkspaceInfo } from '@/types/workspace';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserDataType = {
  userId: string | null;
  workspaceId: number | null;
  workspaceUserId: string | null;
  workspaceList: TWorkspaceInfo[] | null;
  setUserData: (userId: string, workspaceId: number) => void;
  setWorkspaceData: (workspaceUserId: string, workspaceList: TWorkspaceInfo[]) => void;
  clearStore: () => void;
};

const useUserStore = create<UserDataType>()(
  persist<UserDataType>(
    (set, _, api) => ({
      userId: null,
      workspaceId: null,
      workspaceUserId: null,
      workspaceList: null,
      setUserData: (userId: string, workspaceId: number) => set({ userId, workspaceId }),
      setWorkspaceData: (workspaceUserId: string, workspaceList: TWorkspaceInfo[]) =>
        set({
          workspaceUserId,
          workspaceList
        }),
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
