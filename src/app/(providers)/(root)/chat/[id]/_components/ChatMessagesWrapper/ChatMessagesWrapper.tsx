import { StrictPropsWithChildren } from '@/types/common';
import { forwardRef } from 'react';

const ChatMessagesWrapper = forwardRef<HTMLDivElement, StrictPropsWithChildren>(({ children }, ref) => {
  return (
    <article className="flex-grow overflow-y-auto px-4">
      <div className="flex flex-col gap-6 py-4" ref={ref}>
        {children}
      </div>
    </article>
  );
});

export default ChatMessagesWrapper;
