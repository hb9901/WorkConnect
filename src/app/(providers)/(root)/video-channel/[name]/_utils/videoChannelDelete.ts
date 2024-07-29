'use client';
import { createClient } from '@/utils/supabase/supabaseClient';

export const deleteChannel = async (channel_id: number | null) => {
  if (!channel_id) return;

  const supabase = createClient();
  const { data: channelUSerList, error: selectError } = await supabase
    .from('channel_user')
    .select('*')
    .eq('channel_id', channel_id);
  if (selectError) {
    return console.error('채널에 속한 유저목록 조회 중, 에러 발생.');
  }

  if (channelUSerList!.length > 0) return;

  const { error: deleteError } = await supabase.from('channel').delete().eq('id', channel_id);

  if (deleteError) {
    return console.error('채널을 삭제 도중 에러가 발생했습니다.');
  }
};
