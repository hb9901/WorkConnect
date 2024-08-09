import { createChatMessage, getChatMessages } from '@/services/chat';
import { NextRequest, NextResponse } from 'next/server';
import {
  CHAT_RESPONSE_GET_FAILED,
  CHAT_RESPONSE_POST_FAILED,
  CHAT_RESPONSE_POST_INVALID_REQUEST,
  CHAT_RESPONSE_POST_SUCCESS,
  CHAT_RESPONSE_SUCCESS
} from './constants';

/**
 * Chat[id] GET 요청 핸들러
 * @description params.id 주소를 받아서 채팅 메시지를 조회합니다.
 * @throws {Error} - channel_id가 없는 경우
 */
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id: channel_id } = params;

  try {
    const { data, error } = await getChatMessages({ channel_id: Number(channel_id) });

    if (error) {
      return NextResponse.json(Object.assign(CHAT_RESPONSE_GET_FAILED, { error }), { status: 500 });
    }

    return NextResponse.json(Object.assign(CHAT_RESPONSE_SUCCESS, { data }));
  } catch (error) {
    return NextResponse.json(CHAT_RESPONSE_GET_FAILED, { status: 400 });
  }
};

/**
 * Chat[id] POST 요청 핸들러
 * @description params.id 주소를 받아서 채팅 메시지를 생성합니다.
 * @throws {Error} - content, workspace_user_id가 없는 경우
 */
export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id: channel_id } = params;
  const { content, workspace_user_id, type } = await req.json();

  if (!content || !workspace_user_id) {
    return NextResponse.json(CHAT_RESPONSE_POST_INVALID_REQUEST, { status: 400 });
  }

  try {
    const { error } = await createChatMessage({
      channel_id: Number(channel_id),
      content,
      workspace_user_id,
      type
    });

    if (error) {
      return NextResponse.json(Object.assign(CHAT_RESPONSE_POST_FAILED, { error }), { status: 500 });
    }

    return NextResponse.json(CHAT_RESPONSE_POST_SUCCESS);
  } catch (error) {
    return NextResponse.json(CHAT_RESPONSE_POST_FAILED, { status: 400 });
  }
};
