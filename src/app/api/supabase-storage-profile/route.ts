import { createClient } from '@/utils/supabase/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const image = formData.get('image')!;
  const filename = formData.get('filename');
  const supabase = createClient();

  try {
    const { error } = await supabase.storage.from('profile').upload(`/${filename}`, image);

    if (error)
      return NextResponse.json({ message: 'Failed to insert supabase data', error, status: false, statusCode: 500 });
    return NextResponse.json({ message: 'Success to insert data', status: false, statusCode: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to post data', error, status: false, statusCode: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  try {
    const response = supabase.storage.from('profile').getPublicUrl(`${filename}`);

    if (!response.data)
      return NextResponse.json({ message: 'Failed to insert supabase data', status: false, statusCode: 500 });
    return NextResponse.json(response.data.publicUrl);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to post data', error, status: false, statusCode: 500 });
  }
};
