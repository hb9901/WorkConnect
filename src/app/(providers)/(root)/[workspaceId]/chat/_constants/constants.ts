export const QUERY_KEYS = {
  CHAT_MESSAGES: (channel_id: number) => ['chatMessages', channel_id],
  USERS_IN_CHANNEL: (channel_id: number) => ['usersInChannel', channel_id],
  CHANNEL_NAME: (id: number) => ['channelName', id],
  LATEST_NOTICE: (id: string) => ['latestNotice', id]
};
