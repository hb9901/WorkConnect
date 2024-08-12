export const CHANNEL_DOCUMENTS_RESPONSE = {
  FAILED_TO_GET: '채널 문서 조회에 실패했습니다.'
};

export const CHANNEL_DOCUMENTS_RESPONSE_SUCCESS = {
  status: true,
  data: [],
  message: ''
};

export const CHANNEL_DOCUMENTS_RESPONSE_FAILED = {
  ...CHANNEL_DOCUMENTS_RESPONSE_SUCCESS,
  status: false,
  message: CHANNEL_DOCUMENTS_RESPONSE.FAILED_TO_GET
};
