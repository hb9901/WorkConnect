import { type ComponentProps, useState } from 'react';
import brokenFileImage from '/public/images/common/broken-file.png';
import ChatImage from '../ChatImage';

const ERROR_IMAGE = brokenFileImage.src;

type ChatVideoProps = ComponentProps<'video'>;

const ChatVideo = ({ src = '', className, ...props }: ChatVideoProps) => {
  const [hasError, setHasError] = useState(false);

  if (!src) return null;
  if (hasError) return <ChatImage src={ERROR_IMAGE} alt="error" width={200} height={200} className="h-auto" />;

  return (
    <video
      src={src}
      className={className}
      onError={() => setHasError(true)}
      preload="metadata"
      playsInline
      {...props}
    />
  );
};

export default ChatVideo;
