import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../_constants/constants';
import api from '@/api';
import { GetSearchWorkspaceUsersProps } from '@/types/workspaceUser';
import { getChannelsOptions } from '../_utils/getQueryOptions';

export const useGetChannels = (workspaceId: number) => {
  return useQuery(getChannelsOptions(workspaceId));
};

type UseGetSearchWorkspaceUsersProps = GetSearchWorkspaceUsersProps & {
  workspace_id: number;
};

export const useGetSearchWorkspaceUsers = ({ workspace_id, term }: UseGetSearchWorkspaceUsersProps) => {
  return useQuery({
    queryKey: QUERY_KEYS.SEARCH_WORKSPACE_USERS(workspace_id),
    queryFn: () => api.workspace.getSearchWorkspaceUsers({ workspace_id, term }),
    refetchOnWindowFocus: false
  });
};
