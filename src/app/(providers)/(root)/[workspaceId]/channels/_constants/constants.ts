export const QUERY_KEYS = {
  CHANNELS: (workspaceId: number | null) => ['channels', workspaceId],
  SEARCH_WORKSPACE_USERS: (workspaceId: number) => ['searchWorkspaceUsers', workspaceId]
};
