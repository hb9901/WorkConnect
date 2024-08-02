import { NextRequest, NextResponse } from 'next/server';
import { CHANNEL_NAME_RESPONSE_FAILED, CHANNEL_NAME_RESPONSE_SUCCESS } from './constants';
import { getChannelName } from '@/services/channel';

/**
 * Channel name GET 요청 핸들러
 * @description 채널 아이디를 받아서 채널 이름을 조회합니다.
 */
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const { data, error } = await getChannelName({ id });

    if (error) {
      return NextResponse.json(Object.assign(CHANNEL_NAME_RESPONSE_FAILED, { error }));
    }

    return NextResponse.json(Object.assign(CHANNEL_NAME_RESPONSE_SUCCESS, { data }));
  } catch (error) {
    return NextResponse.json(CHANNEL_NAME_RESPONSE_FAILED);
  }
};
