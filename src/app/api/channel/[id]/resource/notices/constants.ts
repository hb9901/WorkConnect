export const CHANNEL_NOTICES_RESPONSE = {
  FAILED_TO_GET: '채널 공지사항 조회에 실패했습니다.'
};

export const CHANNEL_NOTICES_RESPONSE_SUCCESS = {
  status: true,
  data: [],
  message: ''
};

export const CHANNEL_NOTICES_RESPONSE_FAILED = {
  ...CHANNEL_NOTICES_RESPONSE_SUCCESS,
  status: false,
  message: CHANNEL_NOTICES_RESPONSE.FAILED_TO_GET
};
