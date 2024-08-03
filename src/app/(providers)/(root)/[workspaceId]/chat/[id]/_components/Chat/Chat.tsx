import type { ComponentProps } from 'react';
import Typography from '@/components/Typography';
import { CHAT_TYPE } from '@/constants/chat';
import { StrictNextImagePropsType, StrictPropsWithChildren } from '@/types/common';
import { handleDownloadFile } from '@/utils/file';
import Image from 'next/image';
import clsx from 'clsx';
import ChatImage from '../ChatImage';
import ChatVideo from '../ChatVideo';
import { useContextMenu } from '../../_provider/ContextMenuProvider';
import Link from 'next/link';
import { FileTextIcon } from '@/icons';

type ClassNameProps = Pick<ComponentProps<'div'>, 'className'>;

export const ChatContainer = ({ className, children }: StrictPropsWithChildren<ClassNameProps>) => {
  return <div className={clsx('flex flex-col', className)}>{children}</div>;
};

export const ChatThumbnail = ({ src = '', width, height, alt = '', ...props }: StrictNextImagePropsType) => {
  return (
    <Image
      src={src}
      width={width || 50}
      height={height || 50}
      alt={alt}
      className="rounded-full object-cover w-[32px] h-[32px]"
      unoptimized
      {...props}
    />
  );
};

export const ChatOtherProfileContainer = ({
  children,
  as: Component = 'div',
  href
}: StrictPropsWithChildren<{ as?: React.ElementType; href?: string }>) => {
  return (
    <Component className="flex items-center gap-2" href={href}>
      {children}
    </Component>
  );
};

export const ChatOtherProfileName = ({ children }: StrictPropsWithChildren) => {
  return (
    <Typography variant="Title16px" color="grey900">
      {children}
    </Typography>
  );
};

type ChatTextProps = ComponentProps<'div'> & ClassNameProps & { isMe: boolean };

const ChatText = ({ children, className, isMe, ...props }: ChatTextProps) => {
  const chatTextClass = isMe ? 'rounded-br-none bg-[#EBECFE]' : 'rounded-tl-none bg-grey50 ml-[40px] mt-[6px]';

  return (
    <Typography
      variant="Body12px"
      className={clsx(`max-w-[280px] px-3 py-2 rounded-[20px] whitespace-pre-wrap break-words`, chatTextClass)}
      {...props}
      color="grey700Black"
    >
      {children}
    </Typography>
  );
};

type ChatFileProps = ComponentProps<'button'> & { fileUrl: string; fileName: string };

const ChatFile = ({ fileUrl, fileName, ...props }: ChatFileProps) => {
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

type ChatNoticeProps = ComponentProps<'div'> & ClassNameProps & { isMe: boolean; noticeUrl: string };

const ChatNotice = ({ children, className, isMe, noticeUrl, ...props }: ChatNoticeProps) => {
  const chatTextClass = isMe ? 'rounded-br-none' : 'rounded-tl-none ml-[40px] mt-[6px]';

  return (
    <div
      className={clsx(chatTextClass, 'max-w-[280px] rounded-[20px] bg-[#F7F7F7] py-2 px-3 min-w-[188px]')}
      {...props}
    >
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

type ChatMessageProps = {
  content: string;
  type: string;
  isMe: boolean;
  id: number;
  noticeUrl: string;
};

const TOP_BAR_HEIGHT = 52;

export const ChatMessage = ({ content, type, isMe, id, noticeUrl }: ChatMessageProps) => {
  const { openContextMenu } = useContextMenu();

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement | HTMLVideoElement>) => {
    event.preventDefault();

    const rect = (event.target as HTMLElement).getBoundingClientRect();

    const screenHeight = window.innerHeight;
    const elementOffsetTop = rect.top + window.scrollY;

    const pos = screenHeight - elementOffsetTop - TOP_BAR_HEIGHT - rect.height;
    const dynamicPos = pos >= 150 ? pos : pos + rect.height;

    openContextMenu({ position: dynamicPos, id, type, text: content, isMe });
  };

  switch (type) {
    case CHAT_TYPE.image:
      return (
        <ChatImage
          src={content}
          className={clsx('rounded-lg w-[200px] h-auto', isMe ? '' : 'ml-[40px] mt-[6px]')}
          width={300}
          height={300}
          onContextMenu={handleContextMenu}
        />
      );
    case CHAT_TYPE.document:
      return (
        <ChatFile
          fileUrl={content}
          fileName={content.split('/').pop() || ''}
          onContextMenu={handleContextMenu}
          className={clsx(isMe ? '' : 'ml-[40px] mt-[6px]')}
        />
      );
    case CHAT_TYPE.video:
      return (
        <ChatVideo
          src={content}
          className={clsx('rounded-lg', isMe ? '' : 'ml-[40px] mt-[6px]')}
          width={200}
          onContextMenu={handleContextMenu}
          controls
        />
      );
    case CHAT_TYPE.text:
      return (
        <ChatText onContextMenu={handleContextMenu} isMe={isMe}>
          {content}
        </ChatText>
      );

    case CHAT_TYPE.notice:
      return (
        <ChatNotice onContextMenu={handleContextMenu} isMe={isMe} noticeUrl={noticeUrl}>
          {content}
        </ChatNotice>
      );
    default:
      return null;
  }
};
