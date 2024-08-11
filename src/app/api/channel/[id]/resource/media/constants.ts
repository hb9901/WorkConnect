export const CHANNEL_MEDIA_RESPONSE = {
  FAILED_TO_GET: '채널 미디어 조회에 실패했습니다.'
};

export const CHANNEL_MEDIA_RESPONSE_SUCCESS = {
  status: true,
  data: [],
  message: ''
};

export const CHANNEL_MEDIA_RESPONSE_FAILED = {
  ...CHANNEL_MEDIA_RESPONSE_SUCCESS,
  status: false,
  message: CHANNEL_MEDIA_RESPONSE.FAILED_TO_GET
};
