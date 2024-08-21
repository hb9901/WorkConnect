'use client';

import type { StrictPropsWithChildren } from '@/types/common';
import { createContext, useContext, useState, useCallback } from 'react';

const TOP_BAR_HEIGHT = 84;

export type OpenContextMenuProps = { targetElement: DOMRect } & Omit<ContextMenuStateType, 'isOpen' | 'position'>;

export type ContextMenuStateType = {
  isOpen: boolean;
  id: number | null;
  type: string | null;
  position: { y: number; isAtTop: boolean };
  text: string | null;
  isMe: boolean;
};

export type ContextMenuContextType = {
  openContextMenu: (props: OpenContextMenuProps) => void;
  closeContextMenu: () => void;
  contextMenuState: ContextMenuStateType;
};

const defaultContextMenuState = {
  isOpen: false,
  id: null,
  type: null,
  position: { y: 0, isAtTop: false },
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
  const [contextMenuState, setContextMenuState] = useState<ContextMenuStateType>(defaultContextMenuState);

  const closeContextMenu = useCallback(() => {
    setContextMenuState(defaultContextMenuState);
  }, []);

  const openContextMenu = useCallback(({ targetElement, ...props }: OpenContextMenuProps) => {
    const adjustedBottom = targetElement.bottom - TOP_BAR_HEIGHT;
    const adjustedTop = targetElement.top - TOP_BAR_HEIGHT;
    const isAtTop = window.innerHeight - adjustedBottom >= 250;

    const position = isAtTop ? adjustedBottom + 10 : adjustedTop - 10;

    setContextMenuState((prev) => ({
      ...prev,
      isOpen: true,
      position: { y: position, isAtTop },
      ...props
    }));
  }, []);

  return (
    <ContextMenuContext.Provider value={{ openContextMenu, closeContextMenu, contextMenuState }}>
      {children}
    </ContextMenuContext.Provider>
  );
};
