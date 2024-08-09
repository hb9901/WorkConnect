'use client';

import type { StrictPropsWithChildren } from '@/types/common';
import { createContext, useContext, useState, useCallback } from 'react';

export type OpenContextMenuProps = {
  isOpen: boolean;
  id: number | null;
  type: string | null;
  position: number;
  text: string | null;
  isMe: boolean;
};

export type ContextMenuContextType = {
  openContextMenu: (props: Omit<OpenContextMenuProps, 'isOpen'>) => void;
  closeContextMenu: () => void;
  contextMenuState: OpenContextMenuProps;
};

const defaultContextMenuState = {
  isOpen: false,
  id: null,
  type: null,
  position: 0,
  text: null,
  isMe: false
};

const ContextMenuContext = createContext<ContextMenuContextType | undefined>(undefined);

export const useContextMenu = () => {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error('useContextMenu must be used within a ContextMenuProvider');
  }
  return context;
};

export const ContextMenuProvider = ({ children }: StrictPropsWithChildren) => {
  const [contextMenuState, setContextMenuState] = useState<OpenContextMenuProps>(defaultContextMenuState);

  const openContextMenu = useCallback((props: Omit<OpenContextMenuProps, 'isOpen'>) => {
    setContextMenuState((prev) => ({
      ...prev,
      isOpen: true,
      ...props
    }));
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenuState(defaultContextMenuState);
  }, []);

  return (
    <ContextMenuContext.Provider value={{ openContextMenu, closeContextMenu, contextMenuState }}>
      {children}
    </ContextMenuContext.Provider>
  );
};
