export const QUERY_KEYS = {
  CHANNELS: (workspaceId: number | null) => ['channels', workspaceId],
  CHANNEL_ID: (workspaceId: number | null) => ['channelId', workspaceId],
  SEARCH_WORKSPACE_USERS: (workspaceId: number) => ['searchWorkspaceUsers', workspaceId]
};
