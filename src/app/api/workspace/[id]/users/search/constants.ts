export const WORKSPACE_USER_SEARCH_RESPONSE = {
  INVALID_REQUEST: '요청 형식이 올바르지 않습니다. (Hint: workspace_user_id는 필수로 전달해야 합니다.)',
  FAILED_TO_GET: '워크스페이스 유저 검색에 실패했습니다.'
};

export const WORKSPACE_USER_SEARCH_RESPONSE_SUCCESS = {
  status: true,
  data: [],
  message: ''
};

export const WORKSPACE_USER_SEARCH_RESPONSE_FAILED = {
  ...WORKSPACE_USER_SEARCH_RESPONSE_SUCCESS,
  status: false,
  message: WORKSPACE_USER_SEARCH_RESPONSE.FAILED_TO_GET
};

export const WORKSPACE_USER_SEARCH_RESPONSE_INVALID_REQUEST = {
  ...WORKSPACE_USER_SEARCH_RESPONSE_SUCCESS,
  status: false,
  message: WORKSPACE_USER_SEARCH_RESPONSE.INVALID_REQUEST
};
