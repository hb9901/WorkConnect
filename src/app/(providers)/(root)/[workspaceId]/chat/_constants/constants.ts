export const QUERY_KEYS = {
  CHAT_CHANNELS: (workspace_id: number | null, workspace_user_id: string | null) => [
    'chatChannels',
    workspace_id,
    workspace_user_id
  ],
  CHAT_MESSAGES: (channel_id: number) => ['chatMessages', channel_id],
  SEARCH_WORKSPACE_USERS: (workspace_id: number | null, term: string) => ['searchWorkspaceUsers', workspace_id, term],
  USERS_IN_CHANNEL: (channel_id: number) => ['usersInChannel', channel_id],
  EXISTING_CHANNEL_ID: ['existingChannelId'],
  CHANNEL_NAME: (id: string) => ['channelName', id],
  LATEST_NOTICE: (id: string) => ['latestNotice', id]
};
