import { NextRequest, NextResponse } from 'next/server';
import {
  CHANNEL_NAME_RESPONSE_FAILED,
  CHANNEL_NAME_RESPONSE_INVALID_REQUEST,
  CHANNEL_NAME_RESPONSE_SUCCESS
} from './constants';
import { getChannelInfo } from '@/services/channel';
import { getServerCookie } from '@/utils/cookie/serverUtils';

/**
 * Channel name GET 요청 핸들러
 * @description 채널 아이디를 받아서 채널 이름을 조회합니다.
 */
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  const workspaceUserId = getServerCookie('workspaceUserId');

  if (!workspaceUserId) {
    return NextResponse.json(CHANNEL_NAME_RESPONSE_INVALID_REQUEST, { status: 400 });
  }

  try {
    const { data, error } = await getChannelInfo({ id: Number(id), wuid: workspaceUserId });

    if (error) {
      return NextResponse.json(Object.assign(CHANNEL_NAME_RESPONSE_FAILED, { error }), {
        status: 500
      });
    }

    return NextResponse.json(Object.assign(CHANNEL_NAME_RESPONSE_SUCCESS, { data }));
  } catch (error) {
    return NextResponse.json(CHANNEL_NAME_RESPONSE_FAILED, { status: 500 });
  }
};
