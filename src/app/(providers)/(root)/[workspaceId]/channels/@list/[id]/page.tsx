'use client';

import { useEffect, useState } from 'react';
import ChatList from '../_components/ChatList';

const ChatSlot = () => {
  const [isPC, setIsPC] = useState<boolean | null>(null);

  useEffect(() => {
    setIsPC(window.innerWidth >= 1024);
  }, []);

  if (!isPC) return null;

  return <ChatList />;
};

export default ChatSlot;
