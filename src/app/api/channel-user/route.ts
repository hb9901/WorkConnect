import { createChannelUsers } from "@/services/channelUser";
import { NextRequest, NextResponse } from "next/server";
import { CHANNEL_USER_RESPONSE } from "./constants";

/**
 * Channel User POST 요청 핸들러
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