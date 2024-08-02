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
  const chatTextClass = isMe ? 'rounded-tr-none bg-[#EBECFE]' : 'rounded-tl-none bg-grey50 ml-[40px] mt-[6px]';

  return (
    <Typography
      variant="Body12px"
      className={clsx(`max-w-xs px-3 py-2 rounded-[20px] whitespace-pre-wrap`, chatTextClass)}
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

type ChatMessageProps = {
  content: string;
  type: string;
  isMe: boolean;
  id: number;
};

const TOP_BAR_HEIGHT = 52;

export const ChatMessage = ({ content, type, isMe, id }: ChatMessageProps) => {
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
    default:
      return null;
  }
};
