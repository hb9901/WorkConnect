export const QUERY_KEYS = {
  CHAT_CHANNELS: ['chatChannels'],
  CHAT_MESSAGES: (channel_id: number) => ['chatMessages', channel_id],
  SEARCH_WORKSPACE_USERS: (workspace_id: number | null, term: string) => ['searchWorkspaceUsers', workspace_id, term],
  USERS_IN_CHANNEL: (channel_id: number, workspace_user_id: string) => [
    'usersInChannel',
    channel_id,
    workspace_user_id
  ],
  EXISTING_CHANNEL_ID: ['existingChannelId']
};
