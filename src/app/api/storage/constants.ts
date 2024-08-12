export const STORAGE_RESPONSE = {
  FAILED_TO_POST: '파일 업로드에 실패했습니다.',
  SUCCESS_TO_POST: '파일 업로드에 성공했습니다.',
  POST_INVALID_REQUEST:
    '요청 형식이 올바르지 않습니다. (Hint: file을 여러개 보냈거나 file, storagePath, maxFileSize를 필수로 전달하지 않았습니다.)',
  POST_FILE_SIZE_EXCEEDED: '파일 크기가 기준을 초과했습니다.'
};

export const STORAGE_RESPONSE_SUCCESS = {
  status: true,
  data: [],
  message: ''
};

export const STORAGE_RESPONSE_POST_SUCCESS = {
  ...STORAGE_RESPONSE_SUCCESS,
  message: STORAGE_RESPONSE.SUCCESS_TO_POST
};

export const STORAGE_RESPONSE_POST_INVALID_REQUEST = {
  ...STORAGE_RESPONSE_SUCCESS,
  status: false,
  message: STORAGE_RESPONSE.POST_INVALID_REQUEST
};

export const STORAGE_RESPONSE_POST_FILE_SIZE_EXCEEDED = {
  ...STORAGE_RESPONSE_SUCCESS,
  status: false,
  message: STORAGE_RESPONSE.POST_FILE_SIZE_EXCEEDED
};

export const STORAGE_RESPONSE_POST_FAILED = {
  ...STORAGE_RESPONSE_SUCCESS,
  status: false,
  message: STORAGE_RESPONSE.FAILED_TO_POST
};
