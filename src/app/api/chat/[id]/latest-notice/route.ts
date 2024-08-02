import { NextRequest, NextResponse } from 'next/server';
import { CHAT_LATEST_NOTICE_RESPONSE_FAILED, CHAT_LATEST_NOTICE_RESPONSE_SUCCESS } from './constants';
import { getLatestNotice } from '@/services/chat';

/**
 * Chat[id]/notice GET 요청 핸들러
 * @description 채팅 채널 아이디를 받아서 채팅 공지를 조회합니다.
 * @throws {Error} - channel_id가 없는 경우
 */
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id: channel_id } = params;

  try {
    const { data, error } = await getLatestNotice({ channel_id: Number(channel_id) });

    if (error) {
      return NextResponse.json(Object.assign(CHAT_LATEST_NOTICE_RESPONSE_FAILED, { error }));
    }

    return NextResponse.json(Object.assign(CHAT_LATEST_NOTICE_RESPONSE_SUCCESS, { data }));
  } catch (error) {
    return NextResponse.json(CHAT_LATEST_NOTICE_RESPONSE_FAILED);
  }
};
