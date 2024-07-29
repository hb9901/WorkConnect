import type { Tables } from './supabase';

export type WorkspaceUserType = Tables<'workspace_user'>;

export type GetSearchWorkspaceUsersProps = Pick<WorkspaceUserType, 'workspace_id'> & {
  term: string;
  workspace_user_id: WorkspaceUserType['id'];
};

export type SearchWorkspaceUserType = Pick<WorkspaceUserType, 'id' | 'name' | 'profile_image'>;

export type GetSearchWorkspaceUsersResponse = SearchWorkspaceUserType[];
