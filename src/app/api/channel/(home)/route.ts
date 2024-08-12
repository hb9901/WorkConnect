import { NextRequest, NextResponse } from 'next/server';
import { CHAT_LIST_RESPONSE_FAILED, CHAT_LIST_RESPONSE_INVALID_REQUEST, CHAT_LIST_RESPONSE_SUCCESS } from './constants';
import { getServerCookie } from '@/utils/cookie/serverUtils';
import { createChannel, getChannels } from '@/services/channel';
import { createClient } from '@/utils/supabase/supabaseServer';

/**
 * Channels GET 요청 핸들러
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
    const { data, error } = await getChannels({
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

export const POST = async (request: NextRequest) => {
  const { name, type, workspace_id, host_id, thumbnail } = await request.json();
  try {
    const { data, error } = await createChannel({ name, type, workspace_id, host_id, thumbnail });

    if (error)
      return NextResponse.json({
        message: 'Failed to insert channel data',
        error,
        status: false,
        statusCode: 500
      });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to insert data',
      error,
      status: false,
      statusCode: 500
    });
  }
};

export const DELETE = async (request: NextRequest) => {
  const supabase = createClient();

  const { id, workspace_id } = await request.json();
  try {
    const { error } = await supabase.from('channel').delete().eq('id', id).eq('workspace_id', workspace_id);
    if (error)
      return NextResponse.json({
        message: 'Failed to delete channel data',
        error,
        status: false,
        statusCode: 500
      });
    return NextResponse.json({ message: 'Delete Channel' });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to delete data',
      error,
      status: false,
      statusCode: 500
    });
  }
};
