import { createClient } from '@/utils/supabase/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const workspaceId = searchParams.get('workspaceId');
  const userId = searchParams.get('userId');

  try {
    const { data: workspaceListData, error: userError } = await supabase
      .from('workspace_user')
      .select('id, workspace_id(id, name, invite_code)')
      .eq('user_id', userId!)
      .order('created_at', { ascending: true });

    const { data: userData, error: workspaceListError } = await supabase
      .from('workspace_user')
      .select('*')
      .eq('user_id', userId!)
      .eq('workspace_id', workspaceId!);

    const workspaceList = workspaceListData?.map((workspace) => {
      const workspaceUserId = workspace.id;
      const workspaceInfo = workspace.workspace_id;

      return { workspace_user_id: workspaceUserId, ...workspaceInfo };
    });

    const data = {
      userData,
      workspaceListData: workspaceList
    };

    if (userError)
      return NextResponse.json({
        message: 'Failed to fetch supabase data',
        userError,
        status: false,
        statusCode: 500
      });
    if (workspaceListError)
      return NextResponse.json({
        message: 'Failed to fetch supabase data',
        workspaceListError,
        status: false,
        statusCode: 500
      });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch data',
      error,
      status: false,
      statusCode: 500
    });
  }
};
