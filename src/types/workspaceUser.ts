import { CHAT_STATUS } from '@/constants/chat';
import type { Tables } from './supabase';

export type WorkspaceUserType = Omit<Tables<'workspace_user'>, 'state'> & {
  state: keyof typeof CHAT_STATUS;
};

export type GetSearchWorkspaceUsersProps = Pick<WorkspaceUserType, 'workspace_id'> & {
  term: string;
};

export type SearchWorkspaceUserType = Pick<WorkspaceUserType, 'id' | 'name' | 'profile_image'>;

export type GetSearchWorkspaceUsersResponse = SearchWorkspaceUserType[];
