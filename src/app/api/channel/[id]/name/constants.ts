export const CHANNEL_NAME_RESPONSE = {
  FAILED_TO_GET: '채널 이름 조회에 실패했습니다.',
  INVALID_REQUEST: 'workspaceUserId가 없습니다.'
};

export const CHANNEL_NAME_RESPONSE_SUCCESS = {
  status: true,
  data: [],
  message: ''
};

export const CHANNEL_NAME_RESPONSE_INVALID_REQUEST = {
  ...CHANNEL_NAME_RESPONSE_SUCCESS,
  status: false,
  message: CHANNEL_NAME_RESPONSE.INVALID_REQUEST
};

export const CHANNEL_NAME_RESPONSE_FAILED = {
  ...CHANNEL_NAME_RESPONSE_SUCCESS,
  status: false,
  message: CHANNEL_NAME_RESPONSE.FAILED_TO_GET
};
