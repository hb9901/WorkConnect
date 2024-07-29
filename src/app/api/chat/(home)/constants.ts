export const CHAT_LIST_RESPONSE = {
  INVALID_REQUEST: '요청 형식이 올바르지 않습니다. (Hint: workspace_id와 workspace_user_id는 필수로 전달해야 합니다.)',
  FAILED_TO_GET: '채팅 목록 조회에 실패했습니다.'
};

export const CHAT_LIST_RESPONSE_SUCCESS = {
  statusCode: 200,
  status: true,
  data: [],
  message: ''
};

export const CHAT_LIST_RESPONSE_FAILED = {
  ...CHAT_LIST_RESPONSE_SUCCESS,
  statusCode: 500,
  status: false,
  message: CHAT_LIST_RESPONSE.FAILED_TO_GET
};

export const CHAT_LIST_RESPONSE_INVALID_REQUEST = {
  ...CHAT_LIST_RESPONSE_SUCCESS,
  statusCode: 400,
  status: false,
  message: CHAT_LIST_RESPONSE.INVALID_REQUEST
};
