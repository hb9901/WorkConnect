export const CHANNEL_NAME_RESPONSE = {
  FAILED_TO_GET: '채널 이름 조회에 실패했습니다.'
};

export const CHANNEL_NAME_RESPONSE_SUCCESS = {
  statusCode: 200,
  status: true,
  data: [],
  message: ''
};

export const CHANNEL_NAME_RESPONSE_FAILED = {
  ...CHANNEL_NAME_RESPONSE_SUCCESS,
  statusCode: 500,
  status: false,
  message: CHANNEL_NAME_RESPONSE.FAILED_TO_GET
};
