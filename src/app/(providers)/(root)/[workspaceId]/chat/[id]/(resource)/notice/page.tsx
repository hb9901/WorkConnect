'use client';

import { supabase } from '@/utils/supabase/supabaseClient';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CHAT_TYPE } from '@/constants/chat';
import Typography from '@/components/Typography';
import dayjs from 'dayjs';

const NoticeListPage = () => {
  const { id } = useParams();
  const [noticeList, setNoticeList] = useState<any[]>([]);

  useEffect(() => {
    const getNoticeList = async () => {
      const res = await supabase
        .from('chat')
        .select('*')
        .eq('channel_id', id)
        .eq('type', CHAT_TYPE.notice)
        .order('created_at', { ascending: false });
      setNoticeList(res.data || []);
    };

    getNoticeList();
  }, []);

  return (
    <ul className="flex flex-col gap-4 py-[22px] px-4">
      {noticeList.map((notice) => (
        <li
          key={notice.id}
          className="h-[94px] bg-[#F7F7F7] shadow-[0px_1px_8px_0px_rgba(0,0,0,0.15)] rounded-[6px] px-3 py-4 flex flex-col justify-between"
        >
          <Typography variant="Subtitle14px" color="grey700Black">
            {notice.content}
          </Typography>
          <Typography variant="Body12px" color="grey300">
            {dayjs(notice.created_at).format('YYYY.MM.DD HH:mm')}
          </Typography>
        </li>
      ))}
    </ul>
  );
};

export default NoticeListPage;
