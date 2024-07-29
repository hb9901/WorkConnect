import { NextRequest, NextResponse } from 'next/server';
import {
  CHANNEL_USERS_RESPONSE_FAILED,
  CHANNEL_USERS_RESPONSE_INVALID_REQUEST,
  CHANNEL_USERS_RESPONSE_SUCCESS
} from './constants';
import { getUsersInChannel } from '@/services/channel';

/**
 * Users in Channel GET 요청 핸들러
 * @description 채널 아이디와 워크스페이스 유저 아이디를 받아서 채널에 속한 유저 목록을 조회합니다.
 * @throws {Error} - channel_id, workspace_user_id가 없는 경우
 */
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { searchParams } = new URL(req.url);
  const { id: channel_id } = params;

  const workspace_user_id = searchParams.get('workspace_user_id');

  if (!workspace_user_id) {
    return NextResponse.json(CHANNEL_USERS_RESPONSE_INVALID_REQUEST);
  }

  try {
    const { data, error } = await getUsersInChannel({
      channel_id: parseInt(channel_id),
      workspace_user_id
    });

    if (error) {
      return NextResponse.json(Object.assign(CHANNEL_USERS_RESPONSE_FAILED, { error }));
    }

    return NextResponse.json(Object.assign(CHANNEL_USERS_RESPONSE_SUCCESS, { data }));
  } catch (error) {
    return NextResponse.json(CHANNEL_USERS_RESPONSE_FAILED);
  }
};
