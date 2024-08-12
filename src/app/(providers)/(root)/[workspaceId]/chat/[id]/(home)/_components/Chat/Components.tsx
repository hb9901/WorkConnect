'use client';

import Typography from '@/components/Typography';
import { ComponentProps } from 'react';
import clsx from 'clsx';
import { handleDownloadFile } from '@/utils/file';
import Link from 'next/link';
import { FileTextIcon } from '@/icons';

type ClassNameProps = Pick<ComponentProps<'div'>, 'className'>;

type ChatTextProps = ComponentProps<'div'> & ClassNameProps & { className?: string };

export const ChatText = ({ children, className, ...props }: ChatTextProps) => {
  return (
    <Typography
      variant="Body12px"
      className={clsx(
        `max-w-[280px] px-3 py-2 rounded-[20px] whitespace-pre-wrap break-words selection:bg-transparent break-keep`,
        className
      )}
      {...props}
      color="grey700Black"
    >
      {children}
    </Typography>
  );
};

type ChatFileProps = ComponentProps<'button'> & { fileUrl: string; fileName: string };

export const ChatFile = ({ fileUrl, fileName, ...props }: ChatFileProps) => {
  return (
    <button
      type="button"
      onClick={() => handleDownloadFile(fileUrl, fileName)}
      className="rounded-lg border-b-2 border-gray-300 bg-white p-2 shadow-xl"
      {...props}
    >
      파일: {fileName}
    </button>
  );
};

type ChatNoticeProps = ComponentProps<'div'> & ClassNameProps & { noticeUrl: string; className?: string };

export const ChatNotice = ({ children, className, noticeUrl, ...props }: ChatNoticeProps) => {
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
      <Link href={noticeUrl}>
        <Typography as="span" variant="Body12px" className="flex items-center gap-1 mt-2" color="grey400">
          <FileTextIcon /> 글 확인하기
        </Typography>
      </Link>
    </div>
  );
};
