import { NextRequest, NextResponse } from 'next/server';
import {
  CHANNEL_EXISTING_ID_RESPONSE_FAILED,
  CHANNEL_EXISTING_ID_RESPONSE_INVALID_REQUEST,
  CHANNEL_EXISTING_ID_RESPONSE_SUCCESS
} from './constants';
import { getExistingChannelId } from '@/services/channel';
import { getServerCookie } from '@/utils/cookie/serverUtils';

/**
 * Channel existing-id GET 요청 핸들러
 * @description dm에 한해서 채널 중복 조회를 진행합니다.
 * @throws {Error} - 선택한 유저가 1명 밖에 없는 경우
 */
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const other_workspace_user_id = searchParams.get('other_workspace_user_id');

  const workspaceUserId = getServerCookie('workspaceUserId');

  if (!workspaceUserId || !other_workspace_user_id) {
    return NextResponse.json(CHANNEL_EXISTING_ID_RESPONSE_INVALID_REQUEST, { status: 400 });
  }

  try {
    const { data, error } = await getExistingChannelId({
      workspace_user_id: workspaceUserId,
      other_workspace_user_id: other_workspace_user_id
    });

    if (error) {
      return NextResponse.json(Object.assign(CHANNEL_EXISTING_ID_RESPONSE_FAILED, { error }), { status: 500 });
    }

    return NextResponse.json(Object.assign(CHANNEL_EXISTING_ID_RESPONSE_SUCCESS, { data }));
  } catch (error) {
    return NextResponse.json(CHANNEL_EXISTING_ID_RESPONSE_FAILED, { status: 500 });
  }
};
