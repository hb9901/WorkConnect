export const CHAT_RESPONSE = {
  FAILED_TO_GET: '채팅 메시지 조회에 실패했습니다.',
  FAILED_TO_POST: '채팅 메시지 생성에 실패했습니다.',
  SUCCESS_TO_POST: '채팅 메시지 생성에 성공했습니다.',
  POST_INVALID_REQUEST: '요청 형식이 올바르지 않습니다. (Hint: content, workspace_user_id는 필수로 전달해야 합니다.)'
};

export const CHAT_RESPONSE_SUCCESS = {
  status: true,
  data: [],
  message: ''
};

export const CHAT_RESPONSE_GET_FAILED = {
  ...CHAT_RESPONSE_SUCCESS,
  status: false,
  message: CHAT_RESPONSE.FAILED_TO_GET
};

export const CHAT_RESPONSE_POST_SUCCESS = {
  ...CHAT_RESPONSE_SUCCESS,
  message: CHAT_RESPONSE.SUCCESS_TO_POST
};

export const CHAT_RESPONSE_POST_INVALID_REQUEST = {
  ...CHAT_RESPONSE_SUCCESS,
  status: false,
  message: CHAT_RESPONSE.POST_INVALID_REQUEST
};

export const CHAT_RESPONSE_POST_FAILED = {
  ...CHAT_RESPONSE_SUCCESS,
  status: false,
  message: CHAT_RESPONSE.FAILED_TO_POST
};
