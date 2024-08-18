import { NextRequest, NextResponse } from 'next/server';
import { createChannel } from '@/services/channel';
import { createClient } from '@/utils/supabase/supabaseServer';

export const POST = async (request: NextRequest) => {
  const { name, type, workspace_id, host_id, thumbnail } = await request.json();
  try {
    const { data, error } = await createChannel({ name, type, workspace_id, host_id, thumbnail });

    if (error)
      return NextResponse.json({
        message: 'Failed to insert channel data',
        error,
        status: false,
        statusCode: 500
      });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to insert data',
      error,
      status: false,
      statusCode: 500
    });
  }
};

export const DELETE = async (request: NextRequest) => {
  const supabase = createClient();

  const { id, workspace_id } = await request.json();
  try {
    const { error } = await supabase.from('channel').delete().eq('id', id).eq('workspace_id', workspace_id);
    if (error)
      return NextResponse.json({
        message: 'Failed to delete channel data',
        error,
        status: false,
        statusCode: 500
      });
    return NextResponse.json({ message: 'Delete Channel' });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to delete data',
      error,
      status: false,
      statusCode: 500
    });
  }
};
