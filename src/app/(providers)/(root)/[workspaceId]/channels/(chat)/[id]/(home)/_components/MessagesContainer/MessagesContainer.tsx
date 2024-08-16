'use client';

import { StrictPropsWithChildren } from '@/types/common';
import { useState } from 'react';
import MessageSender from '../MessageSender';

const MessagesContainer = ({ children }: StrictPropsWithChildren) => {
  const [isOpenUtil, setIsOpenUtil] = useState(false);

  const handleOpenUtil = () => {
    setIsOpenUtil((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col flex-grow h-[calc(100dvh+45px)] lg:h-[calc(100dvh-84px)] transform ease-in-out duration-300 ${
        isOpenUtil ? 'translate-y-[-96px]' : 'translate-y-[0px]'
      } lg:translate-y-0`}
    >
      {children}
      <MessageSender handleOpenUtil={handleOpenUtil} />
      {isOpenUtil && <div className="fixed top-0 left-0 w-full h-full z-40 lg:hidden" onClick={handleOpenUtil} />}
    </div>
  );
};

export default MessagesContainer;
