import { NextResponse } from 'next/server';
import { getChannelId } from '@/services/channel';
import { getServerCookie } from '@/utils/cookie/serverUtils';
import { CHAT_LIST_RESPONSE_FAILED, CHAT_LIST_RESPONSE_INVALID_REQUEST, CHAT_LIST_RESPONSE_SUCCESS } from './constants';
/**
 * Channel GET 요청 핸들러
 * @description 워크스페이스 아이디와 워크스페이스 유저 아이디를 받아서 채팅 채널 목록을 조회합니다.
 * @throws {Error} - workspace_id, workspace_user_id가 없는 경우
 */
export const GET = async () => {
  const workspaceUserId = getServerCookie('workspaceUserId');
  const workspaceId = getServerCookie('workspaceId');

  if (!workspaceId || !workspaceUserId) {
    return NextResponse.json(CHAT_LIST_RESPONSE_INVALID_REQUEST, { status: 400 });
  }

  try {
    const { data, error } = await getChannelId({
      workspace_id: parseInt(workspaceId),
      workspace_user_id: workspaceUserId
    });

    if (error) {
      return NextResponse.json(Object.assign(CHAT_LIST_RESPONSE_FAILED, { error }), { status: 500 });
    }

    return NextResponse.json(Object.assign(CHAT_LIST_RESPONSE_SUCCESS, { data }));
  } catch (error) {
    return NextResponse.json(CHAT_LIST_RESPONSE_FAILED, { status: 500 });
  }
};
