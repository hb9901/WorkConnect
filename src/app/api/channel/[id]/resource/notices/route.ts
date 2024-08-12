import { NextRequest, NextResponse } from 'next/server';
import { CHANNEL_NOTICES_RESPONSE_FAILED, CHANNEL_NOTICES_RESPONSE_SUCCESS } from './constants';
import { getChannelNotices } from '@/services/chat';

/**
 * Channel notices GET 요청 핸들러
 * @description 채널 아이디를 받아서 채널 공지사항을 조회합니다.
 */
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const { data, error } = await getChannelNotices({ channel_id: Number(id) });

    if (error) {
      return NextResponse.json(Object.assign(CHANNEL_NOTICES_RESPONSE_FAILED, { error }), {
        status: 500
      });
    }

    return NextResponse.json(Object.assign(CHANNEL_NOTICES_RESPONSE_SUCCESS, { data }));
  } catch (error) {
    return NextResponse.json(CHANNEL_NOTICES_RESPONSE_FAILED, { status: 500 });
  }
};
