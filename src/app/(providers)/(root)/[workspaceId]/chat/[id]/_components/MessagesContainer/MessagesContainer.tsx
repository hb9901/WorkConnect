import { StrictPropsWithChildren } from '@/types/common';
import { forwardRef, useState } from 'react';
import MessageSender from '../MessageSender';

export const MessagesContainer = ({ children }: StrictPropsWithChildren) => {
  const [isOpenUtil, setIsOpenUtil] = useState(false);

  const handleOpenUtil = () => {
    setIsOpenUtil((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col flex-grow h-[calc(100dvh+42px)] transform ease-in-out duration-300 ${
        isOpenUtil ? 'translate-y-[-96px]' : 'translate-y-[0px]'
      }`}
    >
      {children}
      <MessageSender handleOpenUtil={handleOpenUtil} />
      {isOpenUtil && <div className="fixed top-0 left-0 w-full h-full z-40" onClick={handleOpenUtil} />}
    </div>
  );
};

export const ChatMessagesWrapper = forwardRef<HTMLDivElement, StrictPropsWithChildren>(({ children }, ref) => {
  return (
    <article className="flex-grow overflow-y-auto px-4">
      <div className="relative flex flex-col gap-6 py-4" ref={ref}>
        {children}
      </div>
    </article>
  );
});
