import { getSearchWorkspaceUsers } from '@/services/workspaceUser';
import { NextRequest, NextResponse } from 'next/server';
import {
  WORKSPACE_USER_SEARCH_RESPONSE_FAILED,
  WORKSPACE_USER_SEARCH_RESPONSE_INVALID_REQUEST,
  WORKSPACE_USER_SEARCH_RESPONSE_SUCCESS
} from './constants';
import { getServerCookie } from '@/utils/cookie/serverUtils';

/**
 * Workspace User Search GET 요청 핸들러
 * @description /api/workspace/[id]/users/search
 * @throws {Error} - userIds가 배열이 아니거나 channel_id가 없는 경우
 */
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const workspaceUserId = getServerCookie('workspaceUserId');
  const { searchParams } = new URL(req.url);
  const term = searchParams.get('term') || '';

  const { id: workspace_id } = params;

  if (!workspaceUserId) {
    return NextResponse.json(WORKSPACE_USER_SEARCH_RESPONSE_INVALID_REQUEST, { status: 400 });
  }

  try {
    const { data, error } = await getSearchWorkspaceUsers({
      workspace_id: Number(workspace_id),
      term,
      workspace_user_id: workspaceUserId
    });

    if (error) {
      return NextResponse.json(Object.assign(WORKSPACE_USER_SEARCH_RESPONSE_FAILED, { error }), { status: 500 });
    }

    return NextResponse.json(Object.assign(WORKSPACE_USER_SEARCH_RESPONSE_SUCCESS, { data }));
  } catch (error) {
    return NextResponse.json(WORKSPACE_USER_SEARCH_RESPONSE_FAILED, { status: 400 });
  }
};
