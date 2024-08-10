import { NextRequest, NextResponse } from 'next/server';
import { CHANNEL_USERS_RESPONSE_FAILED, CHANNEL_USERS_RESPONSE_SUCCESS } from './constants';
import { getUsersInChannel } from '@/services/channel';
import { getServerCookie } from '@/utils/cookie/serverUtils';

/**
 * Users in Channel GET 요청 핸들러
 * @description 채널 아이디를 받아서 채널에 속한 유저 목록을 조회합니다.
 */
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id: channel_id } = params;

  try {
    const { data, error } = await getUsersInChannel({
      channel_id: parseInt(channel_id)
    });

    if (error) {
      return NextResponse.json(Object.assign(CHANNEL_USERS_RESPONSE_FAILED, { error }), { status: 500 });
    }

    return NextResponse.json(Object.assign(CHANNEL_USERS_RESPONSE_SUCCESS, { data }));
  } catch (error) {
    return NextResponse.json(CHANNEL_USERS_RESPONSE_FAILED, { status: 500 });
  }
};
