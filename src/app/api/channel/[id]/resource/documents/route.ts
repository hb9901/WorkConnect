import { NextRequest, NextResponse } from 'next/server';
import { CHANNEL_DOCUMENTS_RESPONSE_FAILED, CHANNEL_DOCUMENTS_RESPONSE_SUCCESS } from './constants';
import { getChannelDocuments } from '@/services/chat';

/**
 * Channel documents GET 요청 핸들러
 * @description 채널 아이디를 받아서 채널 문서를 조회합니다.
 */
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const { data, error } = await getChannelDocuments({ channel_id: Number(id) });

    if (error) {
      return NextResponse.json(Object.assign(CHANNEL_DOCUMENTS_RESPONSE_FAILED, { error }), {
        status: 500
      });
    }

    return NextResponse.json(Object.assign(CHANNEL_DOCUMENTS_RESPONSE_SUCCESS, { data }));
  } catch (error) {
    return NextResponse.json(CHANNEL_DOCUMENTS_RESPONSE_FAILED, { status: 500 });
  }
};
