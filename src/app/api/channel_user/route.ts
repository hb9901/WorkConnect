// pages/api/channel.js

import { createClient } from '@/utils/supabase/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get('channel_id');
  try {
    const { data, error } = await supabase
      .from('channel_user')
      .select('workspace_user_id')
      .eq('channel_id', channelId!);
    if (error)
      return NextResponse.json({
        message: 'Failed to fetch channel data',
        error,
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

export const POST = async (request: NextRequest) => {
  const supabase = createClient();

  const { name, user_id, channel_id, workspace_user_id } = await request.json();
  try {
    const { error } = await supabase.from('channel_user').insert({ name, user_id, channel_id, workspace_user_id });

    if (error)
      return NextResponse.json({
        message: 'Failed to insert channel_user data',
        error,
        status: false,
        statusCode: 500
      });
    return NextResponse.json({ message: 'User Enter the room Successfully' });
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
  const { channel_id, workspace_user_id } = await request.json();
  try {
    const { error } = await supabase
      .from('channel_user')
      .delete()
      .eq('channel_id', channel_id)
      .eq('workspace_user_id', workspace_user_id);
    if (error)
      return NextResponse.json({
        message: 'Failed to delete channel_user data',
        error,
        status: false,
        statusCode: 500
      });
    return NextResponse.json({ message: 'User leave Successfully' });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to delete data',
      error,
      status: false,
      statusCode: 500
    });
  }
};
