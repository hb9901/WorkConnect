export const CHAT_TYPE = {
  text: 'text',
  notice: 'notice',
  document: 'document',
  image: 'image',
  video: 'video'
} as const;

export const CHAT_STATUS = {
  '미팅・회의': '미팅・회의',
  '재택 근무 중': '재택 근무 중',
  휴가: '휴가',
  '병가・연차': '병가・연차',
  출장: '출장',
  '자리 비움': '자리 비움'
} as const;
