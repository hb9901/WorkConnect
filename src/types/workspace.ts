import { Tables } from './supabase';

export type TWorkspaceInfo = {
  id: number;
  workspace_user_id: string;
  invite_code: number;
  name: string;
};

export type TWorkSpaceListType = {
  userData: Tables<'workspace_user'>[];
  workspaceListData: TWorkspaceInfo[];
};
