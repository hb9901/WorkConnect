'use client';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import { supabase } from '@/utils/supabase/supabaseClient';
import clsx from 'clsx';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ImageIcon from '@/icons/image.svg';
import PaperclipIcon from '@/icons/Paperclip.svg';
import UserIcon from '@/icons/User.svg';
import HashIcon from '@/icons/Hash.svg';
import ChevronRightIcon from '@/icons/ChevronRight.svg';
import Typography from '@/components/Typography';

// TODO 나를 포함해야됨;
const Sidebar = ({ className }: { className: string }) => {
  const workspaceId = useWorkspaceId();
  const { id } = useParams();
  const [channelName, setChannelName] = useState('');

  //TODO: 근데 이거 채팅 상세에서 헤더에서도 불러와야해서 고민 필요
  useEffect(() => {
    const getChannelName = async () => {
      const { data, error } = await supabase.from('channel').select('name').eq('id', id).single();
      setChannelName(data?.name ?? '');
    };
    getChannelName();
  }, []);

  return (
    <aside className={clsx('bg-white fixed top-0 right-0 h-dvh z-30 w-[300px] px-4', className)}>
      <div className="flex flex-col">
        <Typography variant="Title20px" color="grey700Black" as="strong" className="py-[14px]">
          {channelName}
        </Typography>
        <div className="flex items-center gap-2 mt-4">
          <UserIcon className="text-grey700Black stroke-current" />
          <Typography variant="Subtitle16px" color="grey700Black" as="button">
            대화멤버
          </Typography>
        </div>
        <ul className="flex flex-col gap-8 mt-8 pt-8 border-t border-grey50">
          <li>
            <Link href={`/${workspaceId}/chat/${id}/media`} className="flex items-center gap-3">
              <ImageIcon className="text-grey700Black stroke-current" />
              <Typography variant="Subtitle16px" color="grey700Black" as="span" className="flex-1">
                사진&middot;동영상
              </Typography>
              <ChevronRightIcon className="text-grey300 stroke-current" />
            </Link>
          </li>
          <li>
            <Link href={`/${workspaceId}/chat/${id}/file`} className="flex items-center gap-3">
              <PaperclipIcon className="text-grey700Black fill-current" />
              <Typography variant="Subtitle16px" color="grey700Black" as="span" className="flex-1">
                파일
              </Typography>
              <ChevronRightIcon className="text-grey300 stroke-current" />
            </Link>
          </li>
          <li>
            <Link href={`/${workspaceId}/chat/${id}/notice`} className="flex items-center gap-3">
              <HashIcon className="text-grey700Black fill-current" />
              <Typography variant="Subtitle16px" color="grey700Black" as="span" className="flex-1">
                공지
              </Typography>
              <ChevronRightIcon className="text-grey300 stroke-current" />
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
