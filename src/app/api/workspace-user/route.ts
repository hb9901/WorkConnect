import { createClient } from '@/utils/supabase/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('workspaceUserId');

  try {
    const { data, error } = await supabase
      .from('workspace_user')
      .select('id, name, phone, email, profile_image, user(id, state)')
      .eq('id', id!);
    const workspaceUserInfo = data && data[0];
    if (error)
      return NextResponse.json({
        message: 'Failed to fetch supabase data',
        error,
        status: false,
        statusCode: 500
      });
    return NextResponse.json(workspaceUserInfo);
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch data',
      error,
      status: false,
      statusCode: 500
    });
  }
};

export const PUT = async (request: NextRequest) => {
  const workspaceUser = await request.json();
  const id = workspaceUser.id;
  const supabase = createClient();

  try {
    const { error } = await supabase.from('workspace_user').update(workspaceUser).eq('id', id);

    if (error)
      return NextResponse.json({ message: 'Failed to insert supabase data', error, status: false, statusCode: 500 });
    return NextResponse.json({ message: 'Success to insert data', error, status: false, statusCode: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to post data', error, status: false, statusCode: 500 });
  }
};
