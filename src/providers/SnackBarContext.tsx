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
          className={`fixed flex justify-center w-full transition-opacity duration-300 pointer-events-none z-50`}
          style={{ bottom: '90px' }}
        >
          <span className="bg-grey400 px-[16px] py-[8px] rounded-lg shadow-lg text-white">
            {snackBarProps?.message}
          </span>
        </div>
      )}
    </SnackBarContext.Provider>
  );
};
