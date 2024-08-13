import { StrictPropsWithChildren } from '@/types/common';
import { forwardRef } from 'react';

const MessagesWrapper = forwardRef<HTMLDivElement, StrictPropsWithChildren>(({ children }, ref) => {
  return (
    <article className="flex-grow overflow-y-scroll px-4 scroll-container">
      <div className="relative flex flex-col gap-6 py-4" ref={ref}>
        {children}
      </div>
    </article>
  );
});

export default MessagesWrapper;
