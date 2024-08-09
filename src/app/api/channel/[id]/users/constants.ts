export const CHANNEL_USERS_RESPONSE = {
  INVALID_REQUEST: '요청 형식이 올바르지 않습니다. (Hint: channel_id와 workspace_user_id는 필수로 전달해야 합니다.)',
  FAILED_TO_GET: '채널 유저 조회에 실패했습니다.'
};

export const CHANNEL_USERS_RESPONSE_SUCCESS = {
  status: true,
  data: [],
  message: ''
};

export const CHANNEL_USERS_RESPONSE_FAILED = {
  ...CHANNEL_USERS_RESPONSE_SUCCESS,
  status: false,
  message: CHANNEL_USERS_RESPONSE.FAILED_TO_GET
};

export const CHANNEL_USERS_RESPONSE_INVALID_REQUEST = {
  ...CHANNEL_USERS_RESPONSE_SUCCESS,
  status: false,
  message: CHANNEL_USERS_RESPONSE.INVALID_REQUEST
};
