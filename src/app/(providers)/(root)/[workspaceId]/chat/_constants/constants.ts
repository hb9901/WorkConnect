export const QUERY_KEYS = {
  CHAT_MESSAGES: (channel_id: number) => ['chatMessages', channel_id],
  USERS_IN_CHANNEL: (channel_id: number) => ['usersInChannel', channel_id],
  CHANNEL_NAME: (id: number) => ['channelName', id],
  LATEST_NOTICE: (id: number) => ['latestNotice', id],
  CHANNEL_DOCUMENTS: (id: number) => ['channelDocuments', id],
  CHANNEL_MEDIA: (id: number) => ['channelMedia', id],
  CHANNEL_NOTICES: (id: number) => ['channelNotices', id]
};

export const STORAGE_BUCKET_NAME = {
  imageFile: 'photos',
  videoFile: 'videos',
  documentFile: 'documents'
} as const;
