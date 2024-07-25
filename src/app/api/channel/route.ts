// pages/api/channel.js

import { createClient } from '@/utils/supabase/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient();
const channel = supabase.from('channel');

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    const { data, error } = await channel.select().eq('type', type!).order('created_at', { ascending: true });
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
  const { name, type } = await request.json();
  try {
    const { error } = await channel.insert({ name, type });
    if (error)
      return NextResponse.json({
        message: 'Failed to insert channel data',
        error,
        status: false,
        statusCode: 500
      });
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
  const { name, type } = await request.json();
  try {
    const { error } = await channel.delete().eq('name', name).eq('type', type);
    if (error)
      return NextResponse.json({
        message: 'Failed to delete channel data',
        error,
        status: false,
        statusCode: 500
      });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to delete data',
      error,
      status: false,
      statusCode: 500
    });
  }
};
