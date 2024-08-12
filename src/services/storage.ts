import { createClient } from '@/utils/supabase/supabaseServer';

const RESOURCE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/`;

export const postUploadFile = async ({ storagePath, file }: { storagePath: string; file: File }) => {
  const supabase = createClient();

  const { data, error } = await supabase.storage.from(storagePath).upload(`${Date.now()}`, file);

  return { data: `${RESOURCE_URL}${data?.fullPath}`, error };
};
