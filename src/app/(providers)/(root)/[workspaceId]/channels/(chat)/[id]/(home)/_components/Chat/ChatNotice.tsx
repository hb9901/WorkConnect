'use client';

import Typography from '@/components/Typography';
import { ComponentProps } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { FileTextIcon } from '@/icons';

type ChatNoticeProps = ComponentProps<'div'> & { src: string; className?: string };

const ChatNotice = ({ children, className, src, ...props }: ChatNoticeProps) => {
  return (
    <div className={clsx(className, 'max-w-[280px] rounded-[20px] bg-[#F7F7F7] py-2 px-3 min-w-[188px]')} {...props}>
      <Typography as="span" variant="Body12px" className="border-b border-grey100 pb-[6px] mb-[5px] block">
        공지가 등록되었습니다.
      </Typography>
      <Typography
        as="span"
        variant="Body12px"
        className="whitespace-pre-wrap border-b border-grey100 py-[12px] flex items-center pb-[15px] break-all"
        color="grey700Black"
      >
        {children}
      </Typography>
      <Link href={src}>
        <Typography as="span" variant="Body12px" className="flex items-center gap-1 mt-2" color="grey400">
          <FileTextIcon /> 글 확인하기
        </Typography>
      </Link>
    </div>
  );
};

export default ChatNotice;
