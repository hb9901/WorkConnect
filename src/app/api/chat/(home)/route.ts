import { getChatChannels } from '@/services/chatChannel';
import { NextRequest, NextResponse } from 'next/server';
import { CHAT_LIST_RESPONSE_FAILED, CHAT_LIST_RESPONSE_INVALID_REQUEST, CHAT_LIST_RESPONSE_SUCCESS } from './constants';

/**
 * Chat GET 요청 핸들러
 * @description 워크스페이스 아이디와 워크스페이스 유저 아이디를 받아서 채팅 채널 목록을 조회합니다.
 * @throws {Error} - workspace_id, workspace_user_id가 없는 경우
 */
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const workspace_id = searchParams.get('workspace_id');
  const workspace_user_id = searchParams.get('workspace_user_id');

  if (!workspace_id || !workspace_user_id) {
    return NextResponse.json(CHAT_LIST_RESPONSE_INVALID_REQUEST);
  }

  try {
    const { data, error } = await getChatChannels({
      workspace_id: parseInt(workspace_id),
      workspace_user_id
    });

    if (error) {
      return NextResponse.json(Object.assign(CHAT_LIST_RESPONSE_FAILED, { error }));
    }

    return NextResponse.json(Object.assign(CHAT_LIST_RESPONSE_SUCCESS, { data }));
  } catch (error) {
    return NextResponse.json(CHAT_LIST_RESPONSE_FAILED);
  }
};
