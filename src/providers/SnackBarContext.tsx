'use client';

import { StrictPropsWithChildren } from '@/types/common';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type SnackBarProps = {
  message: string;
  duration?: number;
};

type SnackBarContextType = {
  snackBarProps: SnackBarProps | undefined;
  openSnackBar: (props: SnackBarProps) => void;
};

const SnackBarContext = createContext<SnackBarContextType | undefined>(undefined);

export const useSnackBar = () => {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error('useSnackBar must be used within a SnackBarContextProvider');
  }
  return context;
};

export const SnackBarContextProvider = ({ children }: StrictPropsWithChildren) => {
  const [snackBarProps, setSnackBarProps] = useState<SnackBarProps | undefined>(undefined);

  const openSnackBar = useCallback((props: SnackBarProps) => {
    setSnackBarProps(props);
  }, []);

  useEffect(() => {
    if (!snackBarProps) return;

    const timer = setTimeout(() => {
      setSnackBarProps(undefined);
    }, snackBarProps.duration || 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [snackBarProps]);

  return (
    <SnackBarContext.Provider value={{ snackBarProps, openSnackBar }}>
      {children}
      {snackBarProps?.message && (
        <div
          className={`fixed left-1/2 transform -translate-x-1/2 bg-grey400 text-white px-[16px] py-[8px] rounded-lg shadow-lg transition-opacity duration-300`}
          style={{ bottom: '90px' }}
        >
          {snackBarProps?.message}
        </div>
      )}
    </SnackBarContext.Provider>
  );
};
