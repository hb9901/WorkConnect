export const QUERY_KEYS = {
  CHANNELS: (workspaceId: number | null) => ['channels', workspaceId],
  SEARCH_WORKSPACE_USERS: (workspace_id: number | null, term: string) => ['searchWorkspaceUsers', workspace_id, term]
};
