export const CHAT_LATEST_NOTICE_RESPONSE = {
  FAILED_TO_GET: '채팅 공지 조회에 실패했습니다.'
};

export const CHAT_LATEST_NOTICE_RESPONSE_SUCCESS = {
  status: true,
  data: {},
  message: ''
};

export const CHAT_LATEST_NOTICE_RESPONSE_FAILED = {
  ...CHAT_LATEST_NOTICE_RESPONSE_SUCCESS,
  status: false,
  message: CHAT_LATEST_NOTICE_RESPONSE.FAILED_TO_GET
};
