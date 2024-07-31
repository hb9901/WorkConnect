import { type ComponentProps, useState } from 'react';
import brokenFileImage from '/public/images/common/broken-file.png';
import ChatImage from '../ChatImage';
import clsx from 'clsx';

const ERROR_IMAGE = brokenFileImage.src;

type ChatVideoProps = ComponentProps<'video'> & { width?: number; height?: number };

const ChatVideo = ({ src = '', className, width, height, ...props }: ChatVideoProps) => {
  const [hasError, setHasError] = useState(false);

  if (!src) return null;
  if (hasError)
    return (
      <ChatImage
        src={ERROR_IMAGE}
        alt="error"
        width={width || 200}
        height={height || 200}
        className={clsx('h-auto', className)}
      />
    );

  return (
    <video
      src={src}
      className={className}
      onError={() => setHasError(true)}
      preload="metadata"
      playsInline
      width={width}
      height={height}
      {...props}
    />
  );
};

export default ChatVideo;
