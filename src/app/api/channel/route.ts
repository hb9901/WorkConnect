// pages/api/channel.js

import { createClient } from '@/utils/supabase/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const workspace_id = searchParams.get('workspace_id');

  try {
    const { data, error } = await supabase
      .from('channel')
      .select('*')
      .eq('type', type!)
      .eq('workspace_id', workspace_id!)
      .order('created_at', { ascending: true });
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

  const { name, type, workspace_id } = await request.json();
  try {
    const { data, error } = await supabase.from('channel').insert({ name, type, workspace_id }).select('*');

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
