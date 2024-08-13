import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../_constants/constants';
import api from '@/api';
import { GetSearchWorkspaceUsersProps } from '@/types/workspaceUser';
import { getChannelsOptions } from '../_utils/getQueryOptions';

export const useGetChannels = (workspaceId: number) => {
  return useQuery(getChannelsOptions(workspaceId));
};

export const useGetSearchWorkspaceUsers = ({ workspace_id, term }: GetSearchWorkspaceUsersProps) => {
  return useQuery({
    queryKey: QUERY_KEYS.SEARCH_WORKSPACE_USERS,
    queryFn: () => api.workspace.getSearchWorkspaceUsers({ workspace_id, term }),
    refetchOnWindowFocus: false
  });
};
