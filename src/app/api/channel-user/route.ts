import { createChannelUsers, deleteUserInChannel, getUserListByChannel } from '@/services/channelUser';
import { NextRequest, NextResponse } from 'next/server';
import { CHANNEL_USER_RESPONSE } from './constants';

/**
 * Channel User POST / GET  / DELETE 요청 핸들러
 * @throws {Error} - userIds가 배열이 아니거나 channel_id가 없는 경우
 */

export const POST = async (request: NextRequest) => {
  const { workspaceUserIds, channel_id } = await request.json();

  if (!Array.isArray(workspaceUserIds) || !channel_id) {
    return NextResponse.json({ message: CHANNEL_USER_RESPONSE.INVALID_REQUEST });
  }

  try {
    const { error } = await createChannelUsers({ workspaceUserIds, channel_id });

    if (error)
      return NextResponse.json({
        message: CHANNEL_USER_RESPONSE.FAILED_TO_CREATE,
        error,
        status: false,
        statusCode: 500
      });
    return NextResponse.json({ message: CHANNEL_USER_RESPONSE.SUCCESS_TO_CREATE });
  } catch (error) {
    return NextResponse.json({
      message: CHANNEL_USER_RESPONSE.FAILED_TO_CREATE,
      error,
      status: false,
      statusCode: 500
    });
  }
};

export const GET = async (request: NextRequest) => {
  const { channel_id } = await request.json();
  try {
    const { data, error } = await getUserListByChannel(channel_id);

    if (error)
      return NextResponse.json({
        message: CHANNEL_USER_RESPONSE.FAILED_TO_CREATE,
        error,
        status: false,
        statusCode: 500
      });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      message: CHANNEL_USER_RESPONSE.FAILED_TO_CREATE,
      error,
      status: false,
      statusCode: 500
    });
  }
};

export const DELETE = async (request: NextRequest) => {
  const { workspace_user_id, channel_id } = await request.json();
  try {
    const { error } = await deleteUserInChannel({ workspace_user_id, channel_id });
    if (error)
      return NextResponse.json({
        message: CHANNEL_USER_RESPONSE.FAILED_TO_DELETE,
        error,
        status: false,
        statusCode: 500
      });
    return NextResponse.json({ message: CHANNEL_USER_RESPONSE.SUCCESS_TO_DELETE });
  } catch (error) {
    return NextResponse.json({
      message: CHANNEL_USER_RESPONSE.FAILED_TO_DELETE,
      error,
      status: false,
      statusCode: 500
    });
  }
};
